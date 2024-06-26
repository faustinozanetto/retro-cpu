import { Instruction } from "../instructions/instructions";

export type ProgramLineType = "variable" | "instruction" | "label";

export interface ProgramLine {
  index: number;
  type: ProgramLineType;
  content: string;
}

export interface ProgramContext {
  variables: Record<string, string>;
  labels: Record<string, string>;
  instructions: Instruction[];
}

export interface ProgramResult
  extends Pick<ProgramContext, "labels" | "variables"> {
  name: string;
  memoryUsage: number;
  compiled: string;
}
