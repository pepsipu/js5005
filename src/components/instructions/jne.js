export default function jne(cpu) {
    require("./log")(cpu, `0x${cpu.parameterRegister.get().toString(16)}`);
    if (!cpu.alu.flags.zero) {
        cpu.instructionPointer.set(cpu.parameterRegister.get());
    }
}