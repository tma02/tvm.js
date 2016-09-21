//turing machine implementation in Node.JS

var machine = require('./' + process.argv[2]);
var program = machine.program;
var states = Object.keys(program);

console.log('loaded ' + process.argv[2]);
console.log(states.length + ' states');
console.log(machine.vm);

var tvm = {};

tvm.init = function () {
  this.cells = machine.vm.cells || [];
  this.numCells = machine.vm.numCells || 10;
  this.state = machine.vm.state || 'A';
  this.position = machine.vm.position || 0;
  this.program = program;
  this.halted = false;

  for (var i = 0; i < this.numCells; i++) {
    this.cells[i] = this.cells[i] || '0';
  }
};

tvm.logCurrentStatus = function () {
  var seperator = ' ';
  var line = '';
  for (var i = 0; i < this.cells.length; i++) {
    seperator = this.position == i || this.position == i + 1 ? '*' : ' ';
    line += this.cells[i] + seperator;
  }
  line += ' State: ' + this.state;
  console.log(line);
};

tvm.halt = function (msg) {
  tvm.halted = true;
  console.log('halt: ' + msg);
};

tvm.execCommand = function (state, position) {
  var symbol = this.cells[position];
  //console.log(this);
  //status check to see if we can execute a command
  if (position < 0 || position >= this.cells.length) {
    this.halt('position out of bounds: ' + position + ' (ran out of tape!)');
    return;
  }
  if (states.indexOf(state) == -1) {
    this.halt('state not defined: ' + state);
    return;
  }
  if (Object.keys(this.program[state]).indexOf(symbol) == -1) {
    this.halt('symbol not defined: ' + symbol + ' in state: ' + state);
    return;
  }
  var command = this.program[state][symbol];
  //write cell
  this.cells[position] = command.charAt(0);
  tvm.logCurrentStatus();
  //move pointer
  switch (command.charAt(1)) {
    case 'L':
      this.position--;
      break;
    case 'R':
      this.position++;
      break;
    default:
      this.halt('invalid direction at state: ' + state + ' for symbol: ' + symbol + ' (only L and R are valid)');
      return;
  }
  tvm.logCurrentStatus();
  //check for halt
  if (command.charAt(2) == '!') {
    this.halt('program halt: ' + command.substr(3));
  }
  else {
    //set state
    this.state = command.substr(2);
  }
  tvm.logCurrentStatus();
};

tvm.init();

tvm.logCurrentStatus();

while (!tvm.halted) {
  tvm.execCommand(tvm.state, tvm.position);
}