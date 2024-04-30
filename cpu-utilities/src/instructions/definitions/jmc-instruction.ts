import { InstructionDescription } from "../instructions";

export const JMC_STEP_2: InstructionDescription = {
  addressSignals: {
    PF: "*",
    ZF: "*",
    CF: "1",
    I4: "0",
    I3: "1",
    I2: "1",
    I1: "1",
    I0: "0",
    S2: "0",
    S1: "1",
    S0: "0",
  },
  controlSignals: {
    HLT: "0",
    PCE: "0",
    PCO: "0",
    JMP: "1",
    XE: "0",
    XO: "0",
    YO: "0",
    YE: "0",
    ZO: "0",
    ZE: "0",
    IRE: "0",
    IRO: "1",
    MAE: "0",
    RAE: "0",
    RAO: "0",
    FE: "0",
    ALO: "0",
    ALS: "0",
    ALC: "0",
    IE: "1",
  },
};
