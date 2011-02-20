#!/usr/bin/env seed

// http://www.latrobe.edu.au/philosophy/phimvt/joy/j03atm.html

//
// In addition to Number, we should support
//   character, string, truth value, and set
//   and list/quotation
//

// numeric types are integers and characters,
// boolean types are truth values and sets
// sequence types are strings and lists
// leaf type is anything not a list
// tree is a leaf type or a (possibly empty) list of trees


add = { floop : function(stack) { var value = stack.pop(); stack[stack.length-1] += value; return stack; } }
dot = { floop : function(stack) { print(stack.pop()); return stack; } }
dup = { floop : function(stack) { stack[stack.length] = stack[stack.length-1].copy(); return stack; } }
swap = { floop : function(stack) { var value = stack[stack.length-2]; stack[stack.length-2] = stack[stack.length-1]; stack[stack.length-1] = value; return stack; } }
pop = { floop : function(stack) { stack.pop(); return stack; } }


// stack - push a copy of the stack onto the stack
// unstack - make the list on the top of the stack the new stack
// newstack - make the empty stack the new stack

stack = { floop : function(stack) { var value = stack.copy(); stack[stack.length] = value; return stack; } }
unstack = { floop : function(stack) { var value = stack.pop(); return value; } }
newstack = { floop : function(stack) { return []; } }


testlist = [ [ 12, 13, 14 ], dup, swap, pop, dot, 4, 3, add, 1, 7, add, add, dot, 
	     true, dot, false, dot, "hello", dot,
	     1, 2, 3, 4, stack, 5, 6, dot, dot, swap, dot, swap, dot, swap, dot, swap, dot, 
	     unstack, dot, dot, dot, dot, newstack, stack, dot ];

Number.prototype.floop = function (stack) { stack.push(this); return stack; }
Boolean.prototype.floop = function (stack) { stack.push(this); return stack; }
String.prototype.floop = function (stack) { stack.push(this); return stack; }
Array.prototype.floop = function (stack) { stack.push(this); return stack; }

Number.prototype.copy = function () { return this; }
Boolean.prototype.copy = function () { return this; }
String.prototype.copy = function () { return String(this); }
Array.prototype.copy = function () { return this.concat(); }

// Additionaly we should support 
//    set (to be strictly compatible with Joy)
//    file (however Joy does it)
//    dictionary (seems useful)

stack = []

for (var i = 0; i < testlist.length; i++) {
    stack = testlist[i].floop(stack);
}

// Binary:
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

//
//  + - * / % max min -- usual meaning for numeric types 
//                          the result has the type of the second parameter
//
//  succ pred abs sign
//          -- successor, predecessor, absolute value, signum (-1,0,+1)
//
//  


