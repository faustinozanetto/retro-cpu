import * as fs from "fs/promises";
import { generateROMData } from ".";

export const writeRomFile = async (romFilePath: string) => {
  const romData = generateROMData();
  await fs.writeFile(romFilePath, romData);
};
