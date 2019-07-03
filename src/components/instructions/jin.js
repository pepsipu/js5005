export default function jin(cpu) {
    require("./log")(cpu, `register ${cpu.parameterRegister.get()} (0x${cpu.gpRegisters[cpu.parameterRegister.get()].get().toString(16)}`);
    cpu.instructionPointer.set(cpu.gpRegisters[cpu.parameterRegister.get()].get() * 2);
}