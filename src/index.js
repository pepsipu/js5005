import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import './css/main.css';
import './css/animate.css';
import BinRun from "./components/BinRun";
import AsmRun from "./components/AsmRun";
ReactDom.render(<BinRun/>, document.getElementById("bin-run"));
ReactDom.render(<AsmRun/>, document.getElementById("asm-run"));