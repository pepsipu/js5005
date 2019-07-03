export default function scrn(cpu) {
    let c = document.getElementById("display");
    let ctx = c.getContext("2d");
    let x = cpu.parameterRegister.get() & 15;
    let y = (cpu.parameterRegister.get() & 240) >>> 4;
    let r = ((cpu.colorRegister.get() & 224) >>> 5) * 17;
    let g = ((cpu.colorRegister.get() & 28) >>> 2) * 17;
    let b = (cpu.colorRegister.get() & 7) * 85;
    require("./log")(cpu, `{x (${x}), y (${y})}, rgb(${r}, ${g}, ${b})`);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    ctx.fillRect(x * 8, y * 8, 8, 8);
}