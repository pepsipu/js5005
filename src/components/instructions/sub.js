export default function sub(cpu) {
    require("./log")(cpu, `accumulator [${cpu.alu.accumulator.get()}], register ${cpu.parameterRegister.get()} [${cpu.gpRegisters[cpu.parameterRegister.get()].get()}]`);
    cpu.alu.calculate(1, 1,0, cpu.gpRegisters[cpu.parameterRegister.get()].get(), cpu.alu.accumulator.get(), 1)
}