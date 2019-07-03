//load index register into accumulator
export default function ld(cpu) {
    require("./log")(cpu, `register ${cpu.parameterRegister.get()} [${cpu.gpRegisters[cpu.parameterRegister.get()].get()}] => accumulator (${cpu.alu.accumulator.get()})`);
    cpu.alu.accumulator.set(cpu.gpRegisters[cpu.parameterRegister.get() & 255].get())
}