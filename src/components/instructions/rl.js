export default function rl(cpu) {
    let register = cpu.parameterRegister.get() & 15;
    let shiftValue = (cpu.parameterRegister.get() & 240) >>> 4;
    require("./log")(cpu, `register ${register} (${cpu.gpRegisters[register].get()}) << ${shiftValue}`);
    cpu.gpRegisters[register].set(cpu.gpRegisters[register].get() << shiftValue);
}