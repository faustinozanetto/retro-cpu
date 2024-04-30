import { parseProgramFile } from "./program-generator/parse-program-file";
import { writeRomFile } from "./rom-writer/write-wrom-file";

const main = async () => {
  await writeRomFile("out/rom-file.txt");

  const program = "programs/test.asm";
  const compiledProgram = await parseProgramFile(program, {
    7: 25,
    8: 45,
  });
  console.log(
    "========================================================================"
  );

  console.log("Compiled Program Details:");
  console.log(" - Program File Path: " + program);
  console.log(` - Memory Usage: ${compiledProgram.memoryUsage * 100}%`);
  console.log(` - Output: ${compiledProgram.compiledMemory}`);

  console.log(
    "========================================================================"
  );
};

main();
