export default function str(cpu) {
    let destRegister = cpu.parameterRegister.get() & 15;
    let addressRegister = (cpu.parameterRegister.get() & 240) >>> 4;
    require("./log")(cpu, `register ${destRegister} (${cpu.gpRegisters[destRegister].get()}) => [0x${cpu.gpRegisters[addressRegister].get().toString(16)}] (register ${addressRegister})`);
    cpu.ram.getAddr(cpu.gpRegisters[addressRegister].get()).set(cpu.gpRegisters[destRegister].get())
}