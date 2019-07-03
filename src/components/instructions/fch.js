export default function fch(cpu) {
    let addressRegister = cpu.parameterRegister.get() & 15;
    let destRegister = (cpu.parameterRegister.get() & 240) >>> 4;
    require("./log")(cpu, `register ${addressRegister} (0x${cpu.gpRegisters[addressRegister].get().toString(16)}), register ${destRegister} (${cpu.gpRegisters[destRegister].get()})`);
    cpu.gpRegisters[destRegister].set(cpu.ram.getAddr(cpu.gpRegisters[addressRegister].get()).get());
}