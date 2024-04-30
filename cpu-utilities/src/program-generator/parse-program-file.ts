import * as fs from "fs/promises";

import {
  PROGRAM_COMMENT,
  PROGRAM_LABEL,
  PROGRAM_LABEL_EXPRESSION,
  PROGRAM_VARIABLE,
  PROGRAM_VARIABLE_EXPRESSION,
} from "./constants";
import {
  ProgramContext,
  ProgramLine,
  ProgramLineType,
  ProgramResult,
} from "./program";
import {
  INSTRUCTION_OPERANDS_TYPES,
  InstructionType,
} from "../instructions/instructions";
import {
  compileProgramMemoryToString,
  constructProgramMemory,
  parseOperand,
} from ".";

/**
 * Function for filtering unwanted lines from the program.
 * @param program Raw program string.
 * @returns Filtered lines.
 */
const filterProgramInstructions = (program: string): string[] => {
  return program
    .split("\r\n")
    .filter((line) => !line.startsWith(PROGRAM_COMMENT) && line !== "")
    .map((line) => line.trimEnd());
};

/**
 * Function for parsing the raw program lines.
 * @param lines Program lines.
 * @returns Program lines parsed.
 */
const parseProgramLines = (lines: string[]): ProgramLine[] => {
  let lineIndex = -1;
  return lines.map((line) => {
    const isVariableDeclaration = line.startsWith(PROGRAM_VARIABLE);
    const isLabelDeclaration = line.startsWith(PROGRAM_LABEL);
    const type: ProgramLineType = isVariableDeclaration
      ? "variable"
      : isLabelDeclaration
      ? "label"
      : "instruction";

    if (type === "instruction") lineIndex++;

    return {
      type,
      content: line,
      index: lineIndex,
    };
  });
};

const linesProcessingFunctions: Record<
  ProgramLineType,
  (line: ProgramLine, context: ProgramContext) => void
> = {
  variable: (line, context) => {
    const { type, content } = line;
    let [name, value] = content.split(" ");
    name = name.slice(1);

    const isValidVariableName = PROGRAM_VARIABLE_EXPRESSION.test(name);
    if (!isValidVariableName) {
      throw new Error(`Variable with name: ${name} is not valid!`);
    }

    context.variables[name] = value;
  },
  label: (line, context) => {
    const { type, content } = line;
    const name = content.slice(1);

    const isValidLabelName = PROGRAM_LABEL_EXPRESSION.test(name);
    if (!isValidLabelName) {
      throw new Error(`Label with name: ${name} is not valid!`);
    }

    context.labels[name] = (line.index + 1).toString();
  },
  instruction: (line, context) => {
    const { type, content } = line;
    const [instruction, operand] = content.split(" ");

    const instructionType = instruction as InstructionType;
    const operandType = INSTRUCTION_OPERANDS_TYPES[instructionType];
    if (!operandType) {
      throw new Error(`Invalid operation type: ${type}`);
    }

    let parsedOperand: number | undefined = undefined;
    if (operandType !== "none" && operand) {
      const operandIsVariable = operand in context.variables;
      const operandIsLabel = operand in context.labels;

      if (operandIsVariable) {
        parsedOperand = parseOperand(context.variables[operand], operandType);
      } else if (operandIsLabel) {
        parsedOperand = Number.parseInt(context.labels[operand]);
      } else {
        parsedOperand = Number.parseInt(operand);
      }
    }

    context.instructions.push({
      type: instructionType,
      operand: parsedOperand,
    });
  },
};

const generateProgramContext = (lines: ProgramLine[]): ProgramContext => {
  const context: ProgramContext = {
    variables: {},
    labels: {},
    instructions: [],
  };
  lines.forEach((line) => {
    return linesProcessingFunctions[line.type](line, context);
  });
  return context;
};

/**
 * Function for creating the program memory from a program file.
 * @param programFilePath Program file path.
 * @param addressValues Address values record.
 * @returns Memory string.
 */
export const parseProgramFile = async (
  programFilePath: string,
  addressValues: Record<number, number>
): Promise<ProgramResult> => {
  const fileName = programFilePath.split("/").slice(-1)[0];

  const buffer = await fs.readFile(programFilePath);
  const rawProgramInstructions = filterProgramInstructions(buffer.toString());
  const parsedLines = parseProgramLines(rawProgramInstructions);

  const programContext = generateProgramContext(parsedLines);
  const programMemory = constructProgramMemory(
    programContext.instructions,
    addressValues
  );
  const compiledMemory = compileProgramMemoryToString(programMemory);

  const nonEmptyInstructions = Object.entries(programMemory).reduce(
    (acc, [address, value]) => acc + (value !== "0000" ? 1 : 0),
    0
  );

  const memoryUsage = nonEmptyInstructions / Object.keys(programMemory).length;

  return {
    name: fileName,
    memoryUsage,
    compiled: compiledMemory,
    labels: programContext.labels,
    variables: programContext.variables,
  };
};
