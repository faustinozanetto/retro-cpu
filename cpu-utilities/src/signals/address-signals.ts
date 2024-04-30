export const ADDRESS_SIGNAL_TYPES = [
  "PF",
  "ZF",
  "CF",
  "I4",
  "I3",
  "I2",
  "I1",
  "I0",
  "S2",
  "S1",
  "S0",
] as const;
export type AddressSignalType = (typeof ADDRESS_SIGNAL_TYPES)[number];

export interface AddressSignal {
  name: AddressSignalType;
  description: string;
  bitValue: number;
}

export const ADDRESS_SIGNALS: Record<AddressSignalType, AddressSignal> = {
  PF: {
    name: "PF",
    description: "Parity flag",
    bitValue: 0b0100_0000_0000,
  },
  ZF: {
    name: "ZF",
    description: "Zero flag",
    bitValue: 0b0010_0000_0000,
  },
  CF: {
    name: "CF",
    description: "Carry flag",
    bitValue: 0b0001_0000_0000,
  },
  I4: {
    name: "I4",
    description: "Instruction Opcode 4",
    bitValue: 0b0000_1000_0000,
  },
  I3: {
    name: "I3",
    description: "Instruction Opcode 3",
    bitValue: 0b0000_0100_0000,
  },
  I2: {
    name: "I2",
    description: "Instruction Opcode 2",
    bitValue: 0b0000_0010_0000,
  },
  I1: {
    name: "I1",
    description: "Instruction Opcode 1",
    bitValue: 0b0000_0001_0000,
  },
  I0: {
    name: "I0",
    description: "Instruction Opcode 0",
    bitValue: 0b0000_0000_1000,
  },
  S2: {
    name: "S2",
    description: "Instruction Step 2",
    bitValue: 0b0000_0000_0100,
  },
  S1: {
    name: "S1",
    description: "Instruction Step 1",
    bitValue: 0b0000_0000_0010,
  },
  S0: {
    name: "S0",
    description: "Instruction Step 0",
    bitValue: 0b0000_0000_0001,
  },
};
