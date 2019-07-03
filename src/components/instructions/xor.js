export default function xor(cpu) {
    let registerA = cpu.parameterRegister.get() & 15;
    let registerB = (cpu.parameterRegister.get() & 240) >>> 4;
    require("./log")(cpu, `register ${registerA} (${cpu.gpRegisters[registerA].get()}) ^ ${registerB} (${cpu.gpRegisters[registerB].get()})`);
    cpu.gpRegisters[registerA].set(cpu.gpRegisters[registerB].get() ^ cpu.gpRegisters[registerA].get());
}