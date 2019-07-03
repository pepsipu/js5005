import ALU from './ALU';
import RAM from "./RAM";
import Register from "./Register";

export default class CPU {
    instructionPointer = new Register();
    instructionRegister = new Register();
    instructionMemory = new RAM(512);
    instructionList = [];
    colorRegister = new Register();
    stack = [];
    ram = new RAM(256);
    parameterRegister = new Register();
    gpRegisters = []; //r0 to r15
    alu = new ALU();
    programLength = 0;
    paused = false;
    instructionDecode() {
        this.instructionList[this.instructionRegister.get()](this);
    }
    run() {
        for (let i = 0; i < this.programLength; i++) {
            this.instructionRegister.set(this.instructionMemory.getAddr(this.instructionPointer.get()).get());
            this.parameterRegister.set(this.instructionMemory.getAddr(this.instructionPointer.get() + 1).get());
            if (22 === this.instructionRegister.get()) {
                this.programLength = this.programLength - i;
                this.instructionPointer.set(this.instructionPointer.get() + 2);
                this.paused = true;
                return;
            } else {
                this.instructionDecode();
                console.log(`~~${this.instructionList[this.instructionRegister.get()].name} ran, no errors~~`);
            }
            this.instructionPointer.set(this.instructionPointer.get() + 2);
        }
    }
    constructor() {
        for (let i = 0; i < 16; i++) this.gpRegisters.push(new Register());
        require("./instructions/instructionList").instructions.forEach(instruction => {
            this.instructionList.push(require(`./instructions/${instruction}.js`).default);
        });
    }
}