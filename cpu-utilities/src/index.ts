import { printProgramDebug } from "./program-generator/debug-progam";
import { parseProgramFile } from "./program-generator/parse-program-file";
import { writeRomFile } from "./rom-writer/write-wrom-file";

const main = async () => {
  await writeRomFile("out/rom-file.txt");

  const programFilePath = "programs/test.asm";
  const programResult = await parseProgramFile(programFilePath, {
    7: 25,
    8: 45,
  });

  printProgramDebug(programResult);
};

main();
