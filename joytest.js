#!/usr/bin/env seed


// http://www.latrobe.edu.au/philosophy/phimvt/joy/j03atm.html


add = { floop : function(stack) { var value = stack.pop(); stack[stack.length-1] += value; } }
dot = { floop : function(stack) { print(stack.pop()); } }

testlist = [ [ 12, 13, 14 ], dot, 4, 3, add, 1, 7, add, add, dot, true, dot, false, dot, "hello", dot ];

Number.prototype.floop = function (stack) { stack.push(this); }
Boolean.prototype.floop = function (stack) { stack.push(this); }
String.prototype.floop = function (stack) { stack.push(this); }
Array.prototype.floop = function (stack) { stack.push(this); }

//
// In addition to Number, we should support
//   character, string, truth value, and set
//   and list/quotation
//

//
// dup, swap, pop  - stack operations
// get and put - I/O operations
//

// stack - push a copy of the stack onto the stack
// unstack - make the list on the top of the stack the new stack
// newstack - make the empty stack the new stack

// numeric types are integers and characters,
// boolean types are truth values and sets
// sequence types are strings and lists
// leaf type is anything not a list
// tree is a leaf type or a (possibly empty) list of trees

// Unary:
// pop
// dup 

// Binary:
// swap
// popd - remove the second element
// popop - remove the first and second element
// dupd - duplicate the second element

// Ternary:
// swapd - swap the second and third
// rollup - a b c -- c a b
// rolldown - a b c -- b c a
// choice - X Y Z 
//                  -- if X then Y
//                  -- if !X then Z

// opcase 
//   The opcase operator matches the type of the item with the first 
//   members of the lists. When a match is found, the rest of that list 
//   is pushed onto the stack. If no match is found, then the last list 
//   is used as the default. 

// put -- pop the top of the stack and write it to the output file
// get - read one item from the input and write it to the top of the stack



stack = []

for (var i = 0; i < testlist.length; i++) {
    testlist[i].floop(stack);
}

