#!/usr/bin/env seed

// http://www.latrobe.edu.au/philosophy/phimvt/joy/j03atm.html

//
// Additionaly we should support
//    character (well joy supports it, as a thing separater from a single character string)
//    set (to be strictly compatible with Joy)
//    file (however Joy does it)
//    dictionary (seems useful)
//

// numeric types are integers and characters,
// boolean types are truth values and sets
// sequence types are strings and lists
// leaf type is anything not a list
// tree is a leaf type or a (possibly empty) list of trees

Number.prototype.floop = function (stack) { stack.push(this); return stack; }
Boolean.prototype.floop = function (stack) { stack.push(this); return stack; }
String.prototype.floop = function (stack) { stack.push(this); return stack; }
Array.prototype.floop = function (stack) { stack.push(this); return stack; }

Number.prototype.copy = function () { return this; }
Boolean.prototype.copy = function () { return this; }
String.prototype.copy = function () { return String(this); }
Array.prototype.copy = function () { return this.concat(); }

//
//
//
//

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

// Binary:
// popd - remove the second element
// popop - remove the first and second element
// dupd - duplicate the second element

popd = { floop : function(stack) { stack[stack.length-2] = stack[stack.length-1]; stack.length--; return stack; } }
popop = { floop : function(stack) { stack.length -= 2; return stack; } }
dupd = { floop : function(stack) { stack.push(stack[stack.length-2].copy()); return stack; } }

// Ternary:
// swapd - swap the second and third
// rollup - a b c -- c a b
// rolldown - a b c -- b c a
// choice - X Y Z 
//                  -- if X then Y
//                  -- if !X then Z

swapd = { floop : function(stack) { var value = stack[stack.length-3]; stack[stack.length-3] = stack[stack.length-2]; stack[stack.length-2] = value; return stack; } }
rollup = { floop : function(stack) { return swapd.floop(swap.floop(stack)); } }
rolldown = { floop : function(stack) { return swap.floop(swapd.floop(stack)); } }
choice = { floop : function(stack) { if (stack[stack.length-3] == true) 
				     { stack[stack.length-3] = stack[stack.length-2]; } 
				     else 
				     { stack[stack.length-3] = stack[stack.length-1]; } 
				     stack.length -= 2; return stack; } }


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

// first, second, third -- replace the sequence on the top of the stack with it's 1st, 2nd, 3rd member
// rest - replace the sequence on the top of the stack with the same sequence less the first member.
//
// cons -- stack should be sequence member, becomes sequence with member as it's first element
// swons -- swap cons
//
// uncons, unswons -- The uncons operator replaces the aggregate element by two elements, the first and the rest, with the rest on top. The unswons operator does the same, but with the first on top. 
//
// at, of, drop, take
//     These four binary operators expect an aggregate and a number. That number is used for 
//     indexing into the aggregate. The at operator expects the aggregate A and above that a
//     number N, it returns that member of the aggregate which is at the N-th position in the
//     aggregate. The of operator expects a number N and above that an aggregate A, it returns
//     the N-th member of A. So the two operators are converses of each other. The drop and 
//     take operators both expect an aggregate A and above that a number N. The drop operator 
//     returns an aggragate like A except that the first N elements have been removed. The 
//     take operator returns an aggregate like A except that only the first N elements have 
//     been retained. For all four operators in the case of sequences the sequence ordering
//     is used, and for sets the underlying ordering is used. 
// 





testlist = [ [ 12, 13, 14 ], dup, swap, pop, dot, 4, 3, add, 1, 7, add, add, dot, 
	     true, dot, false, dot, "hello", dot,
	     1, 2, 3, 4, stack, 5, 6, dot, dot, swap, dot, swap, dot, swap, dot, swap, dot, 
	     unstack, dot, dot, dot, dot, newstack, stack, dot ];

stack = []

for (var i = 0; i < testlist.length; i++) {
    stack = testlist[i].floop(stack);
}



