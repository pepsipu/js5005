export class OneBitRegister {
    writeEnable = 0;
    dataOutput = 0;
    dataInput = 0;

    set(dataInput) {
        this.writeEnable = 1;
        this.dataInput = dataInput;
        this.get();
        this.writeEnable = 0;
    }

    get() {
        this.dataOutput = ((this.dataInput & this.writeEnable) | this.dataOutput) & ~(this.writeEnable & ~this.dataInput);
        return this.dataOutput;
    }
}
export default class Register {
    registers = [];
    set(data) {
        let i = 0;
        this.registers.forEach(register => {
            register.set((data & (1 << i)) >>> i);
            i++;
        });
        this.registers.reverse();
    }
    get() {
        let out = "";
        this.registers.forEach(register => {
            out += register.get().toString(2);
        });

        return parseInt(out, 2);
    }
    constructor() {
        for (let i =0; i < 8; i++) this.registers.push(new OneBitRegister())
    }
}

export class DoubleRegister extends Register {
    registers = [];
    constructor() {
        super();
        for (let i =0; i < 16; i++) this.registers.push(new OneBitRegister())
    }
}
