module.exports = function log(cpu, msg) {
    console.log(`[0x${(1 + cpu.instructionPointer.get() / 2).toString(16)}]: ${require("./instructionList").instructions[cpu.instructionRegister.get()]}: ${msg}`);
};