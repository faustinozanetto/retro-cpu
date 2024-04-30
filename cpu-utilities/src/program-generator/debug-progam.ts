import { ProgramResult } from "./program";

export const printProgramDebug = (program: ProgramResult) => {
  console.log(
    "========================================================================"
  );

  console.log("Compiled Program Details:");
  console.log(" - Program: " + program.name);
  console.log(` - Memory Usage: ${program.memoryUsage * 100}%`);
  console.log(` - Variables: `);
  Object.entries(program.variables).map(([name, value]) => {
    console.log(
      `   - ${name}: b_${value} | h_${Number.parseInt(value, 2).toString(16)}`
    );
  });
  console.log(` - Labels: `);
  Object.entries(program.labels).map(([name, value]) => {
    console.log(
      `   - ${name}: b_${value} | h_${Number.parseInt(value, 2).toString(16)}`
    );
  });

  console.log(` - Compiled: ${program.compiled}`);

  console.log(
    "========================================================================"
  );
};
