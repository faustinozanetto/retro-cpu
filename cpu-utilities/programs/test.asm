$var1 00000000111
$var4 00000000001

; Loads into the X register the value storead at address 7
LDX var1
; Increments the X register by 1.
INCX
; Jumps back to the instruction INCX.
JMP var4