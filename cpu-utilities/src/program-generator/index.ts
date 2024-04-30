import {
  DEFAULT_OPERAND,
  OPERAND_MAX_VAL,
  OPERAND_MIN_VAL,
  PROGRAM_MAX_INSTRUCTIONS,
} from "./constants";
import {
  INSTRUCTION_OPERANDS_TYPES,
  Instruction,
  InstructionOperandType,
} from "../instructions/instructions";

type ProgramMemory = Record<string, string>;

const OPCODES = {
  LDX: 0b0_0001,
  LDY: 0b0_0010,
  LDZ: 0b0_0011,
  LDIX: 0b0_0100,
  LDIY: 0b0_0101,
  LDIZ: 0b0_0110,
  ADD: 0b0_0111,
  SUB: 0b0_1000,
  JMP: 0b0_1001,
  INCX: 0b0_1010,
  INCY: 0b0_1011,
  INCZ: 0b0_1100,
  HLT: 0b1_1111,
} as const;

/**
 * Function for validating an operand.
 * @param operand Operand value.
 * @param type Operand type.
 */
const validateOperand = (operand: number, type: InstructionOperandType) => {
  if (type === "none") return;

  if (operand < OPERAND_MIN_VAL || operand > OPERAND_MAX_VAL) {
    throw new Error(
      `Invalid ${type} operand: ${operand}. Must be between 0 and 8.`
    );
  }
};

/**
 * Function for parsing an operand from a string.
 * @param operandStr Operand string.
 * @param type Operand type.
 * @returns Parsed binary operand.
 */
export const parseOperand = (
  operandStr: string,
  type: InstructionOperandType
): number => {
  let operand: number;
  if (type === "address" || type === "value" || type === "jmp-address") {
    operand = parseInt(operandStr, 2);
  } else {
    operand = DEFAULT_OPERAND;
  }
  validateOperand(operand, type);
  return operand;
};

/**
 * Function for constructing the program memory given instructions and a record of address and values.
 * @param instructions Instructions array.
 * @param addressValues Record of addreses and values.
 * @returns Program memory.
 */
export const constructProgramMemory = (
  instructions: Instruction[],
  addressValues: Record<number, number> = {}
): ProgramMemory => {
  const memory: ProgramMemory = {};
  // Populate memory with the instruction opcode and operand.
  instructions.forEach(({ type, operand = DEFAULT_OPERAND }, index) => {
    const opcode = OPCODES[type];
    memory[index] = ((opcode << 11) | operand).toString(16).padStart(4, "0");

    // Handle adding the operand address to the memory location of the operand and the value in the addressValues record.
    if (INSTRUCTION_OPERANDS_TYPES[type] === "address") {
      const operandAddress = operand;
      if (!(operandAddress in addressValues))
        throw new Error(
          `Operand address: ${operandAddress} not found in addressValue record for operation type: ${type}!`
        );
      memory[operandAddress] = addressValues[operandAddress]
        .toString(16)
        .padStart(4, "0");
    }
  });

  // Complete memory with 0 in the positions that are not defined.
  for (let i = 0; i < PROGRAM_MAX_INSTRUCTIONS; i++) {
    const memoryAddressExists = i in memory;
    if (!memoryAddressExists) memory[i] = (0).toString(16).padStart(4, "0");
  }
  return memory;
};

/**
 * Function for generating the memory values string.
 * @param memory Program memory.
 * @returns Memory string.
 */
export const compileProgramMemoryToString = (memory: ProgramMemory): string => {
  return Object.entries(memory)
    .map(([address, value]) => {
      return `${value.toString()}`;
    })
    .join(" ");
};
