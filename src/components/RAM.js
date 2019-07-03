import Register from './Register';

export default class RAM {
    bytes = [];
    getAddr(address) {
        return this.bytes[address];
    }
    constructor(bytes) {
        for (let i = 0; i < 256; i++) this.bytes.push(new Register())
    }
}