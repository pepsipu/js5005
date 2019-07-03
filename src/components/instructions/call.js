export default function call(cpu) {
    require("./log")(cpu, `0x${cpu.parameterRegister.get().toString(16)}`);
    cpu.stack.push(cpu.instructionPointer.get());
    cpu.instructionPointer.set(cpu.parameterRegister.get());
}