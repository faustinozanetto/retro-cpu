import {
  ROM_ADDRESS_DIGITS,
  ROM_BASE,
  ROM_SIZE,
  ROM_VALUE_DIGITS,
} from "./constants";
import {
  InstructionDescription,
  INSTRUCTION_DESCRIPTIONS,
} from "../instructions/instructions";
import { AddressSignalType } from "../signals/address-signals";
import { CONTROL_SIGNALS, ControlSignalType } from "../signals/control-signals";

/**
 * Function for generating all the address combinations of a instruction.
 * @param addressSignals Instruction address signals.
 * @returns Array of addresses.
 */
const generateAddressesCombinations = (
  addressSignals: InstructionDescription["addressSignals"]
): number[] => {
  const addressKeys = Object.keys(addressSignals) as AddressSignalType[];
  const addresses: number[] = [];

  // Helper function to replace don't cares with either 0 or 1
  const generatePermutations = (address: string, index: number) => {
    if (index === addressKeys.length) {
      addresses.push(parseInt(address, 2));
      return;
    }
    const key = addressKeys[index];
    const signal = addressSignals[key];
    if (signal === "*") {
      generatePermutations(address + "0", index + 1);
      generatePermutations(address + "1", index + 1);
    } else {
      generatePermutations(address + signal, index + 1);
    }
  };

  generatePermutations("", 0);

  return addresses;
};

/**
 * Function for generating the binary value of a instructions control signals.
 * @param controlSignals Instruction control signals.
 * @returns Binary value.
 */
const generateControlSignalsValue = (
  controlSignals: InstructionDescription["controlSignals"]
): bigint => {
  let controlSignalValue = BigInt(0);

  // Iterate over each control signal in the instruction description
  for (const [controlSignal, signalValue] of Object.entries(controlSignals)) {
    const bitPosition =
      CONTROL_SIGNALS[controlSignal as ControlSignalType].bitValue;

    // Set the bit in the controlSignalValue based on the signalValue
    if (signalValue === "1") {
      controlSignalValue |= BigInt(bitPosition); // Set the bit to 1
    } else if (signalValue === "0") {
      controlSignalValue &= ~BigInt(bitPosition); // Set the bit to 0
    } else {
      // Do nothing if the value is "*"
    }
  }

  return controlSignalValue;
};

/**
 * Function for generating the instruction data.
 * @param instruction Instruction description.
 * @returns Array of records address value.
 */
const generateInstructionData = (
  instruction: InstructionDescription
): Record<string, string>[] => {
  const addressCombinations = generateAddressesCombinations(
    instruction.addressSignals
  );
  const controlSignalsValue = generateControlSignalsValue(
    instruction.controlSignals
  );

  return addressCombinations.map((address) => {
    return {
      [address.toString(ROM_BASE).padStart(ROM_ADDRESS_DIGITS, "0")]:
        controlSignalsValue.toString(ROM_BASE).padStart(ROM_VALUE_DIGITS, "0"),
    };
  });
};

/**
 * Function for formatting the microcode into a string.
 * @param microCode Microcode record.
 * @returns Rom microcode string.
 */
const formatMicroCode = (microCode: Record<string, string>): string => {
  let formattedData = "";
  let wordIndex = 0;
  for (let i = 0; i <= ROM_SIZE; i++) {
    if (i % 8 === 0) {
      formattedData += `${wordIndex.toString(ROM_BASE).padStart(3, "0")}: `;
    }
    const address = i.toString(ROM_BASE).padStart(ROM_ADDRESS_DIGITS, "0");
    const word =
      microCode[address] ||
      (0).toString(ROM_BASE).padStart(ROM_VALUE_DIGITS, "0");

    formattedData += `${word} `;
    if ((i + 1) % 8 === 0) {
      formattedData += "\n";
      wordIndex += 8;
    }
  }
  return formattedData;
};

/**
 * Function for adding the missing addressess into the rom.
 * @param microCodeData Microcode data record.
 * @returns Completed microcode data record.
 */
const fillMissingAddresses = (
  microCodeData: Record<string, string>
): Record<string, string> => {
  const filledMicroCodeData: Record<string, string> = {};
  for (let i = 0; i <= ROM_SIZE; i++) {
    const address = i.toString(ROM_BASE).padStart(ROM_ADDRESS_DIGITS, "0");
    filledMicroCodeData[address] =
      microCodeData[address] ||
      (0).toString(ROM_BASE).padStart(ROM_VALUE_DIGITS, "0");
  }
  return filledMicroCodeData;
};

export const generateROMData = () => {
  const microCodeData = INSTRUCTION_DESCRIPTIONS.flatMap((instruction) =>
    generateInstructionData(instruction)
  );
  // Combine the instructions into a singular record of addresses and values.
  const allMicroCodeData = microCodeData.reduce((acc, curr) => {
    const address = Object.keys(curr)[0];
    const value = curr[address];
    acc[address] = value;
    return acc;
  }, {});

  const completeMicroCode = fillMissingAddresses(allMicroCodeData);
  const formattedMicroCode = formatMicroCode(completeMicroCode);

  return formattedMicroCode;
};
