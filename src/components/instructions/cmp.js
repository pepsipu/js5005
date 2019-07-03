export default function cmp(cpu) {
    let oldAcc = cpu.alu.accumulator.get();
    let registerA = cpu.gpRegisters[cpu.parameterRegister.get() & 15].get();
    let registerB = cpu.gpRegisters[(cpu.parameterRegister.get() & 240) >>> 4].get();
    require("./log")(cpu, `register ${cpu.parameterRegister.get() & 15} (${registerA}), register ${(cpu.parameterRegister.get() & 240) >>> 4} (${registerB})`);
    cpu.alu.calculate(1,1,0, registerA, registerB,1);
    cpu.alu.accumulator.set(oldAcc);
}