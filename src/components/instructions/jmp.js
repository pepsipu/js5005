export default function jmp(cpu) {
    require("./log")(cpu, `0x${cpu.parameterRegister.get().toString(16)}`);
    cpu.instructionPointer.set(cpu.parameterRegister.get());
}