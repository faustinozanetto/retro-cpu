export const CONTROL_SIGNAL_TYPES = [
  "HLT",
  "PCE",
  "PCO",
  "JMP",
  "XE",
  "XO",
  "YE",
  "YO",
  "ZE",
  "ZO",
  "IRE",
  "IRO",
  "MAE",
  "RAE",
  "RAO",
  "FE",
  "ALO",
  "ALS",
  "ALC",
  "IE",
] as const;
export type ControlSignalType = (typeof CONTROL_SIGNAL_TYPES)[number];

export interface ControlSignal {
  name: ControlSignalType;
  description: string;
  bitValue: number;
}

export const CONTROL_SIGNALS: Record<ControlSignalType, ControlSignal> = {
  HLT: {
    name: "HLT",
    description: "Hlt cpu",
    bitValue: 0b1000_0000_0000_0000_0000,
  },
  PCE: {
    name: "PCE",
    description: "Program counter Enable",
    bitValue: 0b0100_0000_0000_0000_0000,
  },
  PCO: {
    name: "PCO",
    description: "Program counter Output",
    bitValue: 0b0010_0000_0000_0000_0000,
  },
  JMP: {
    name: "JMP",
    description: "Jump Enable",
    bitValue: 0b0001_0000_0000_0000_0000,
  },
  XE: {
    name: "XE",
    description: "X Register Enable",
    bitValue: 0b0000_1000_0000_0000_0000,
  },
  XO: {
    name: "XO",
    description: "X Register Output",
    bitValue: 0b0000_0100_0000_0000_0000,
  },
  YE: {
    name: "YE",
    description: "Y Register Enable",
    bitValue: 0b0000_0010_0000_0000_0000,
  },
  YO: {
    name: "YO",
    description: "Y Register Output",
    bitValue: 0b0000_0001_0000_0000_0000,
  },
  ZE: {
    name: "ZE",
    description: "Z Register Enable",
    bitValue: 0b0000_0000_1000_0000_0000,
  },
  ZO: {
    name: "ZO",
    description: "Z Register Output",
    bitValue: 0b0000_0000_0100_0000_0000,
  },
  IRE: {
    name: "IRE",
    description: "Instruction register Enable",
    bitValue: 0b0000_0000_0010_0000_0000,
  },
  IRO: {
    name: "IRO",
    description: "Instruction Register Output",
    bitValue: 0b0000_0000_0001_0000_0000,
  },
  MAE: {
    name: "MAE",
    description: "Memory Address Register Enable",
    bitValue: 0b0000_0000_0000_1000_0000,
  },
  RAE: {
    name: "RAE",
    description: "RAM Enable",
    bitValue: 0b0000_0000_0000_0100_0000,
  },
  RAO: {
    name: "RAO",
    description: "RAM Out",
    bitValue: 0b0000_0000_0000_0010_0000,
  },
  FE: {
    name: "FE",
    description: "Flags Register Enable",
    bitValue: 0b0000_0000_0000_0001_0000,
  },
  ALO: {
    name: "ALO",
    description: "ALU Output",
    bitValue: 0b0000_0000_0000_0000_1000,
  },
  ALS: {
    name: "ALO",
    description: "ALU Subract",
    bitValue: 0b0000_0000_0000_0000_0100,
  },
  ALC: {
    name: "ALC",
    description: "ALU Constant One",
    bitValue: 0b0000_0000_0000_0000_0010,
  },
  IE: {
    name: "IE",
    description: "Instruction End",
    bitValue: 0b0000_0000_0000_0000_0001,
  },
};
