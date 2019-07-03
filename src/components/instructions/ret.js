export default function ret(cpu) {
    let returnAddress = cpu.stack.pop();
    require("./log")(cpu, `${cpu.instructionPointer.get().toString(16)} => ${returnAddress.toString(16)}`);
    cpu.instructionPointer.set(returnAddress);
}