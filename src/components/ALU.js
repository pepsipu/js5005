import Register from "./Register";

export const fullAdd = (x, y, cIn) => {
    return {
        sum: cIn ^ (x ^ y), //xor x and y, then xor the carry in
        cOut: (x & y) | (cIn & (x ^ y)) //the carry out of x and y, or the carry out of the carry in and x and y's sum
    }
};

const oneBitALU = (mux, nx, ny, x, y, cIn) => {
    //toggle negate
    x = (nx ^ x);
    y = (ny ^ y);
    let xPlusY = fullAdd(x, y, cIn);
    return {
        result: (mux & xPlusY.sum) | (~mux & (x & y)),
        cOut: xPlusY.cOut
    }
};
export default class ALU {
    accumulator = new Register();
    flags = {

    };
    calculate(mux, nx, ny, x, y, cIn) {
        let ALUs = [];
        ALUs.push(oneBitALU(mux, nx, ny, x & 1, y & 1, cIn));
        for (let i = 1; i < 8; i++) {
            ALUs.push(oneBitALU(mux, nx, ny, (x & (1 << i)) >>> i, (y & (1 << i)) >>> i, ALUs[i - 1].cOut));
        }
        let out = "";
        ALUs.reverse();
        ALUs.forEach(alu => {
            out += alu.result
        });
        this.accumulator.set(parseInt(out, 2));
        let zeroFlag = (this.accumulator.get() & 1);
        for (let i = 1; i < 8; i++) {
            zeroFlag = ((this.accumulator.get() & (1 << i)) >>> i) | zeroFlag;
        }
        let outSign = this.accumulator.registers[0].get();
        this.flags = {
            cOut: ALUs[0].cOut,
            zero: ~(zeroFlag) & 1,
            overflow: 0,
            negative: outSign
        };
    }
}