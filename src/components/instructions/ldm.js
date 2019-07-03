//load 8 bit value into accumulator
export default function ldm(cpu) {
    require("./log")(cpu, `${cpu.parameterRegister.get()} => accumulator (${cpu.alu.accumulator.get()})`);
    cpu.alu.accumulator.set(cpu.parameterRegister.get());
}