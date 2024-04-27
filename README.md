# 16 Bit CPU

<img src="images/showcase.png" alt="Circuit Showcase" >

Simple 8 bit cpu implemented using Logisim Evolution based on the SAP-1 computer.

## Features

1) 8 Bit bus
2) 16 ram addresses (0000-1111)
3) 1K Microcode ROM
4) 20 Control Signals
5) Basic ALU
6) 16 Max operations per program.
7) Program for generating the MicroCode ROM.
8) Program for generating the assembly of a program.

## Operations

1) **ADD (address)**: Adds the value stored in address to the A register.
2) **SUB (address)**: Subtracts the value stored in address to the A register.
3) **INC**: Increments the A register by 1.
4) **SUB**: Decremeents the A register by 1.
5) **LDA (address)**: Loads the value stored in address to the A register.
6) **LDI (value)**: Loads the inmediate value in the A register.
7) **STA (addres)**: Stores the A register value in the address.
8) **OUT**: Outputs the A register value.
9) **JMP (address)**: Jumps to the given address.
10) **JMC (address)**: Jumps to the given addres if carry flag = 1.
11) **JMZ (address)**: Jumps to the given address if zero flag = 1.
12) **HLT**: Halts the CPU.

## Control Signals (20 bits)

1) **RAO**: RAM Out.
2) **RAE**: RAM Enable.
3) **MAE**: Memory Address Register Enable.
4) **IRE**: Instruction Register Enable.
5) **IRO**: Instruction Register Output.
6) **AE**: A Register Enable.
7) **AO**: A Register Output.
8) **BE**: B Register Enable.
9) **BO**: B Register Output.
10) **CE**: C Register Enable.
11) **CO**: C Register Output.
12) **SO**: ALU Sum Output.
13) **PCE**: Program Counter Enable.
14) **PCO**: Program Counter Output.
15) **OE**: Output Register Enable.
16) **FE**: Flags Register Enable.
17) **SU**: ALU Subract.
18) **JMP**: Program Counter Load Enable.
19) **ACO**: ALU Constant 1.
20) **HLT**: CPU Halt.

## Address Signals (10 bits)

1) **PF**: Parity Flag.
2) **ZF**: Zero Flag.
3) **CF**: Carry Flag.
4) **I3**: Instruction Op Code 3.
5) **I2**: Instruction Op Code 2.
6) **I1**: Instruction Op Code 1.
7) **I0**: Instruction Op Code 0.
8) **S2**: Instruction Step 2.
9) **S1**: Instruction Step 1.
10) **S0**: Instruction Step 0.
