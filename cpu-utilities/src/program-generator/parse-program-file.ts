import * as fs from "fs/promises";
import {
  INSTRUCTION_OPERANDS_TYPES,
  Instruction,
  InstructionType,
} from "../instructions/instructions";
import {
  compileProgramMemoryToString,
  constructProgramMemory,
  parseOperand,
} from ".";
import { PROGRAM_COMMENT, PROGRAM_MAX_INSTRUCTIONS } from "./constants";

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
 * Function for parsing the raw program instructions into instructions.
 * @param rawInstructions Raw program instructions.
 * @returns Instructions array.
 */
const parseProgramInstructions = (rawInstructions: string[]): Instruction[] => {
  return rawInstructions.map((instruction) => {
    const [op, operandStr] = instruction.split(" ");
    const type = op as InstructionType;
    const operandType = INSTRUCTION_OPERANDS_TYPES[type];
    if (!operandType) {
      throw new Error(`Invalid operation type: ${type}`);
    }
    const operand = operandStr
      ? parseOperand(operandStr, operandType)
      : undefined;
    return { type, operand };
  });
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
) => {
  const buffer = await fs.readFile(programFilePath);
  const rawProgramInstructions = filterProgramInstructions(buffer.toString());
  const instructions = parseProgramInstructions(rawProgramInstructions);

  const programMemory = constructProgramMemory(instructions, addressValues);
  const compiledMemory = compileProgramMemoryToString(programMemory);

  const nonEmptyInstructions = Object.entries(programMemory).reduce(
    (acc, [address, value]) => acc + (value !== "00" ? 1 : 0),
    0
  );

  const memoryUsage = nonEmptyInstructions / Object.keys(programMemory).length;

  return { compiledMemory, memoryUsage };
};
