import { Instruction } from "../instructions/instructions";

export type ProgramLineType = "variable" | "instruction";
export interface ProgramLine {
  type: ProgramLineType;
  content: string;
}

export interface ProgramContext {
  variables: Record<string, string>;
  instructions: Instruction[];
}
