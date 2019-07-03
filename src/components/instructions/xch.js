export default function xch(cpu) {
    let temp = cpu.alu.accumulator.get();
    require("./log")(cpu, `accumulator (${temp}) <=> register ${cpu.parameterRegister.get()} (${cpu.gpRegisters[cpu.parameterRegister.get()].get()})`);
    cpu.alu.accumulator.set(cpu.gpRegisters[cpu.parameterRegister.get()].get());
    cpu.gpRegisters[cpu.parameterRegister.get()].set(temp);
}