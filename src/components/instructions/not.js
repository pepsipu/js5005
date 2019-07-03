export default function not(cpu) {
    let register = cpu.parameterRegister.get();
    require("./log")(cpu, `!register ${register} (${cpu.gpRegisters[register].get()})`);
    cpu.gpRegisters[register].set(~(cpu.gpRegisters[register].get()));
}