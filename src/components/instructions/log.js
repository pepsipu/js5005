module.exports = function log(cpu, msg) {
    console.log(`[0x${(1 + cpu.instructionPointer.get() / 2).toString(16)}]: ${cpu.instructionList[cpu.instructionRegister.get()].name}: ${msg}`);
};