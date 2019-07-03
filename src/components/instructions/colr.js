export default function colr(cpu) {
    require("./log")(cpu, `${cpu.parameterRegister.get()} => color register (${cpu.colorRegister})`)
    cpu.colorRegister.set(cpu.parameterRegister.get());
}