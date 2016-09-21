# tvm.js
Turing machine implemented in Node.js

To run a program:
  ```node tvm.js <program file name>```

Changing the length of the tape for a program:
  
  Edit the numCells variable in the vm object of the program file

example:
  ``"vm": {
    "numCells": 5
  }``
  sets it to 5 cells

Change the current position of the machine:
  
  Edit the position variable in the vm object of the program file

example:
  ```"vm": {
    "position": 4
  }```
  sets it to the FIFTH position (zero-index)

You can also set the initial state and cells in the same way.
The defaults are:

```numCells: 10```

```state: 'A'```

```position: 0```

```cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]```
