import React, {Component} from 'react';
import CPU from "./CPU";

export default class BinRun extends Component {
    cpu = new CPU();
    lastAddr = 0;
    createInstruction(opcode, parameters) {
        this.cpu.instructionMemory[0].getAddr(this.lastAddr).set(opcode);
        this.cpu.instructionMemory[0].getAddr(this.lastAddr + 1).set(parameters);
        this.lastAddr += 2;
    }
    runCode = () => {
        let code = document.getElementById("bin-code").value;
        let instructions = code.split("\n");
        instructions.forEach(instruction => {
            this.createInstruction(parseInt(instruction.slice(8), 2), parseInt(instruction.slice(0, 8), 2))
        });
        this.cpu.run();
        console.log(this.cpu);
        this.lastAddr = 0;
        this.cpu = new CPU();
    };
    render() {
        return <button className="btn btn-dark" onClick={this.runCode}>Run!</button>;
    }
}