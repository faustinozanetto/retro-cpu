import { InstructionDescription } from "../instructions";

export const LDZ_STEP_2: InstructionDescription = {
  addressSignals: {
    PF: "*",
    ZF: "*",
    CF: "*",
    I4: "0",
    I3: "0",
    I2: "0",
    I1: "1",
    I0: "1",
    S2: "0",
    S1: "1",
    S0: "0",
  },
  controlSignals: {
    HLT: "0",
    PCE: "0",
    PCO: "0",
    JMP: "0",
    XE: "0",
    XO: "0",
    YO: "0",
    YE: "0",
    ZO: "0",
    ZE: "0",
    IRE: "0",
    IRO: "1",
    MAE: "1",
    RAE: "0",
    RAO: "0",
    FE: "0",
    ALO: "0",
    ALS: "0",
    ALC: "0",
    IE: "0",
  },
};

export const LDZ_STEP_3: InstructionDescription = {
  addressSignals: {
    PF: "*",
    ZF: "*",
    CF: "*",
    I4: "0",
    I3: "0",
    I2: "0",
    I1: "1",
    I0: "1",
    S2: "0",
    S1: "1",
    S0: "1",
  },
  controlSignals: {
    HLT: "0",
    PCE: "0",
    PCO: "0",
    JMP: "0",
    XE: "0",
    XO: "0",
    YO: "0",
    YE: "0",
    ZO: "0",
    ZE: "1",
    IRE: "0",
    IRO: "0",
    MAE: "0",
    RAE: "0",
    RAO: "1",
    FE: "0",
    ALO: "0",
    ALS: "0",
    ALC: "0",
    IE: "1",
  },
};