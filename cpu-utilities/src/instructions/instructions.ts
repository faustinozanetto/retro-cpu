import { AddressSignalType } from "../signals/address-signals";
import { ControlSignalType } from "../signals/control-signals";
import {
  ADD_STEP_2,
  ADD_STEP_3,
  ADD_STEP_4,
} from "./definitions/add-instruction";
import { FETCH_STEP_0, FETCH_STEP_1 } from "./definitions/fetch-instruction";
import { INCX_STEP_2, INCX_STEP_3 } from "./definitions/incx-instruction";
import { INCY_STEP_2, INCY_STEP_3 } from "./definitions/incy-instruction";
import { INCZ_STEP_2, INCZ_STEP_3 } from "./definitions/incz-instruction";
import { LDIX_STEP_2 } from "./definitions/ldix-instruction";
import { LDIY_STEP_2 } from "./definitions/ldiy-instruction";
import { LDIZ_STEP_2 } from "./definitions/ldiz-instruction";
import { LDX_STEP_2, LDX_STEP_3 } from "./definitions/ldx-instruction";
import { LDY_STEP_2, LDY_STEP_3 } from "./definitions/ldy-instruction";
import { LDZ_STEP_2, LDZ_STEP_3 } from "./definitions/ldz-instruction";
import {
  SUB_STEP_2,
  SUB_STEP_3,
  SUB_STEP_4,
} from "./definitions/sub-instruction";

export const OPERATION_TYPES = [
  "LDX",
  "LDY",
  "LDZ",
  "LDIX",
  "LDIY",
  "LDIZ",
  "ADD",
  "SUB",
  "JMP",
] as const;
export type InstructionType = (typeof OPERATION_TYPES)[number];
export type InstructionOperandType =
  | "address"
  | "jmp-address"
  | "value"
  | "none";

export type SignalValue = "1" | "0" | "*";

export interface Instruction {
  type: InstructionType;
  operand: number;
}

export interface InstructionDescription {
  addressSignals: Record<AddressSignalType, SignalValue>;
  controlSignals: Record<ControlSignalType, SignalValue>;
}

export const INSTRUCTION_DESCRIPTIONS = [
  FETCH_STEP_0,
  FETCH_STEP_1,
  LDX_STEP_2,
  LDX_STEP_3,
  LDY_STEP_2,
  LDY_STEP_3,
  LDZ_STEP_2,
  LDZ_STEP_3,
  LDIX_STEP_2,
  LDIY_STEP_2,
  LDIZ_STEP_2,
  ADD_STEP_2,
  ADD_STEP_3,
  ADD_STEP_4,
  SUB_STEP_2,
  SUB_STEP_3,
  SUB_STEP_4,
  INCX_STEP_2,
  INCX_STEP_3,
  INCY_STEP_2,
  INCY_STEP_3,
  INCZ_STEP_2,
  INCZ_STEP_3,
];

export const INSTRUCTION_OPERANDS_TYPES: Record<
  InstructionType,
  InstructionOperandType
> = {
  LDX: "address",
  LDY: "address",
  LDZ: "address",
  LDIX: "value",
  LDIY: "value",
  LDIZ: "value",
  ADD: "address",
  SUB: "address",
  JMP: "jmp-address",
};
