import { writeRomFile } from "./rom-writer/write-wrom-file";

const main = async () => {
  await writeRomFile("out/rom-file.txt");
};

main();
