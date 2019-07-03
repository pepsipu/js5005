export default function add(cpu) {
    require("./log")(cpu, `accumulator [${cpu.alu.accumulator.get()}], register ${cpu.parameterRegister.get()} [${cpu.gpRegisters[cpu.parameterRegister.get()].get()}]`);
    cpu.alu.calculate(1, 0,0, cpu.alu.accumulator.get(), cpu.gpRegisters[cpu.parameterRegister.get()].get(), 0);
}