'''
                      #537 [Easy] - COLLATZ SEQUENCE
 
This problem was asked by Apple.

A Collatz sequence in mathematics can be defined as follows. Starting with any positive integer:
  if n is even, the next number in the sequence is n / 2
  if n is odd, the next number in the sequence is 3n + 1
It is conjectured that every such sequence eventually reaches the number 1. Test this conjecture.

Bonus: What input n <= 1000000 gives the longest sequence?
'''
def next_num(n: int) -> int:
  return n / 2 if n % 2 == 0 else 3 * n + 1

'''
Tests the conjecture that the sequence reaches 1.
'''
def reaches_one(start_num: int, max_iteration = 10000) -> bool:
  i, new_num = 0, start_num
  while(i < max_iteration and new_num != 1):
    new_num = next_num(new_num)
    print(i, new_num)
    i = i + 1
  return (new_num == 1)
  
# ASSERTIONS
assert(next_num(100) == 50)
assert(next_num(101) == 304)
assert(reaches_one(start_num = 100))