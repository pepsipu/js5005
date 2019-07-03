import React, {Component} from 'react';
import CPU from "./CPU";

export default class AsmRun extends Component {
    cpu = new CPU();
    instructions = {};
    lastAddr = 0;
    ramBank = [];

    createInstruction(opcode, parameters) {
        this.cpu.instructionMemory.getAddr(this.lastAddr).set(opcode);
        this.cpu.instructionMemory.getAddr(this.lastAddr + 1).set(parameters);
        this.lastAddr += 2;
    }

    parse = () => {
        let code = document.getElementById("asm-code").value;
        let instructions = code.split("\n");
        instructions.forEach(instruction => {
            let i = 0;
            let parameters = "";
            let current = instruction.split(" ");
            let parametersListUnconv = current.slice(1, instruction.length).join("").trim().split(",");
            let parametersList = [];
            parametersListUnconv.forEach(param => {
                if (param.startsWith("0x")) {
                    parametersList.push(parseInt(param.slice(2), 16))
                } else {
                    parametersList.push(parseInt(param));
                }
            });
            if (parametersList.length === 1) {
                let x = "";
                Array(8).fill(null).forEach(() => {
                    x += ((parametersList[0] & (1 << i)) >>> i);
                    i++;
                });
                parameters += x.split("").reverse().join("");
            } else if (parametersList.length === 2) {
                let paramOne = "";
                let paramTwo = "";
                Array(4).fill(null).forEach(() => {
                    paramOne += ((parametersList[0] & (1 << i)) >>> i);
                    paramTwo += ((parametersList[1] & (1 << i)) >>> i);
                    i++;
                });
                parameters = paramOne.split("").reverse().join("") + paramTwo.split("").reverse().join("");
            }
            this.createInstruction(this.instructions[current[0]], parseInt(parameters, 2));
        });
        this.cpu.programLength = this.lastAddr / 2;
        this.cpu.run();
        this.updateRegisters();
        this.pushRamBank();
        console.log(this.cpu);
        if (!this.cpu.paused) {
            this.lastAddr = 0;
            this.cpu = new CPU();
        } else {
            this.forceUpdate();
        }

    };
    unpause = () => {
        this.cpu.paused = false;
        this.cpu.run();
        this.updateRegisters();
        this.pushRamBank();
        console.log(this.cpu);
        this.forceUpdate();
        if (!this.cpu.paused) {
            this.lastAddr = 0;
            this.cpu = new CPU();
        }
    };
    updateRegisters = () => {
        for (let i = 0; i < 15; i++) {
            document.getElementById(`r${i}`).innerText = this.cpu.gpRegisters[i].get();
        }
        document.getElementById("rip").innerText = "0x" + (this.cpu.instructionPointer.get() / 2).toString(16);
        document.getElementById("acc").innerText = this.cpu.alu.accumulator.get().toString();
    };

    constructor(props) {
        super(props);
        let i = 0;
        require("./instructions/instructionList").instructions.forEach(instruction => {
            this.instructions[instruction] = i;
            i++;
        });
        document.getElementById("search-button").onclick = this.browseRam.bind(this);
    }

    pushRamBank() {
        this.ramBank = [];
        for (let i = 0; i < 256; i++) {
            this.ramBank.push(this.cpu.ram.getAddr(i).get());
        }
    }

    browseRam() {
        let searchVal = parseInt(document.getElementById("ram-search").value.slice(2), 16);
        document.getElementById("search").innerText = this.ramBank[searchVal] ? this.ramBank[searchVal] : "0";
    }

    static save() {
        localStorage.setItem("code", document.getElementById("asm-code").value);

    }

    static load() {
        document.getElementById("asm-code").value = localStorage.getItem("code");
    }
    getPaused() {
        if (this.cpu.paused) {
            return  <button onClick={this.unpause} className="btn btn-dark mx-auto">Unpause</button>
        }
    }
    render() {
        return (<div className="row">
            <button onClick={this.parse} className="btn btn-dark mx-auto">Run Code</button>
            <button onClick={AsmRun.save} className="btn btn-dark mx-auto">Save Code</button>
            <button onClick={AsmRun.load} className="btn btn-dark mx-auto">Load Code</button>
            {this.getPaused()}
        </div>)
    }
}