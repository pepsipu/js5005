export default function inc(cpu) {
    let currentAcc = cpu.alu.accumulator.get();
    require("./log")(cpu, `register ${cpu.parameterRegister.get()} (${cpu.gpRegisters[cpu.parameterRegister.get() & 255].get()})`);
    cpu.alu.calculate(1, 0,0, cpu.gpRegisters[cpu.parameterRegister.get()].get(), 1, 0);
    if (!cpu.alu.flags.overflow) cpu.gpRegisters[cpu.parameterRegister.get()].set(cpu.alu.accumulator.get());
    else cpu.gpRegisters[cpu.parameterRegister.get()].set(0);
    cpu.alu.accumulator.set(currentAcc);
}