# js5005
js5005 is a virtual CPU with every logic gate simulted. It is an upgraded version of the i4004 CPU, making it fast and efficient. It has many
tweaks and upgrades to allow better writing of code, including a built in register and RAM viewer. It's instruction set makes it versatile, 
even though it's only 8 bits.

### Check console for instructions being run and more debug information.

A live version can be found at http://cpu.pepsipu.com/

## Bug!
For some reason, register prefixes are broken. You can still access registers, but instead of doing, for example, "cmp r3 r4", do "cmp 3 4". If you do not, it seems that all registers become r0. I'll implement a fix soon.

### Instruction Set
##### nop - 0x0 - 00000000
the nop instructions is a no-operation instruction. It takes no parameters and does absolutely nothing.

`nop`
##### ldm - 0x1 - 00000001
ldm loads an 8 bit number into the accumulator.

`ldm <8 bit number>`
##### ld - 0x2 - 00000010
ld loads the content of the index register into the accumulator.

`ld r<index register>`
##### xch - 0x3 - 00000011
xch swaps the value of the accumulator and the target register.

`xch r<index register>`
##### add - 0x4 - 00000100
add adds together the accumulator and the content of the index register.

`add r<index register>`
##### sub - 0x5 - 00000101
sub subtracts the accumulator by the content of the index register. The index register should be in two's complement form.

`sub r<index register>`
##### inc - 0x6 - 00000110
inc increments the index register by one.

`inc r<index register>`
##### ret - 0x7 - 00000111
ret sets the instruction pointer to the topmost return pointer on the stack. This is used to return from a subroutine.

`ret`
##### jin - 0x8 - 00001000
jin sets the instruction pointer to the content of the index register.

`jin r<index register>`

##### fch - 0x9 - 00001001
fch takes two registers as input, and will set the second register as a value in RAM, which has it's address decided by the first register's content.

`fch r<index register>, r<index register>`
##### jmp - 0xa - 00001010
jmp sets the instruction pointer to the parameter given.

`jmp 0x<hex address>`
##### call - 0xb - 00001011
call pushes the current instruction pointer on the stack, then jumps to a subroutine. After the `ret` instruction, it will return to the instruction pointer's original location.

`call 0x<hex address>`

##### cmp - 0xc - 00001100
cmp toggle the zero flag if both contents of the index registers are equal. `je` or `jne` can be used after this instruction for a conditional jump.

`cmp r<index register>, r<index register>`
##### je - 0xd - 00001101
je sets the instruction pointer to the parameter if the zero flag is set.

`je 0x<hex address>`
##### jne - 0xe - 00001110
jne sets the instruction pointer to the parameter if the zero flag is not set.

`jne 0x<hex address>`
##### str - 0xf - 00001111
str stores the value of the second register in the RAM address that is stored in the first register.

`str r<index register>, r<index register>`
##### rr - 0x10 - 00010000
rr rotates the content of the register to the right.

`rr r<index register>`
##### rl - 0x11 - 00010001
rl rotates the content of the register to the left.

`rr r<index register>`
##### and - 0x12 - 00010010
and does a logical and operation with the content of the two registers and stores the result in second register.

`and r<index register>, r<index register>`
       logical and - and - 19
##### or - 0x13 - 00010011
or does a logical or operation with the content of the two registers and stores the result in second register.

`or r<index register>, r<index register>`
##### not - 0x14 - 00010100
not inverts the content of the index register.

`not r<index register>`
##### xor - 0x15 - 00010101
xor does a logical exclusive or operation with the content of the two registers and stores the result in second register.

`xor r<index register>, r<index register>`

##### dbg - 0x16 - 00010110
dbg pauses program execution and allows the user to browse the ram and view the registers.

`dbg`

##### colr - 0x17 - 00010111
colr sets the color register to the parameter. When `scrn` is called, this is the color that is used. Keep in mind this is an 8 bit color.

`color <8 bit number>`
##### scrn - 0x18 - 00011000
scrn takes two parameters, the x and the y position of the pixel you are coloring. The display is 16 by 16, meaning x and y can be from 0 to 15. The pixel's color comes from the color register, which is set with the `colr` instruction.

`scrn <4  bit number>, <4 bit number>`
