'''
                      #537 [Easy] - COLLATZ SEQUENCE
 
This problem was asked by Apple.

A Collatz sequence in mathematics can be defined as follows. Starting with any positive integer:
  if n is even, the next number in the sequence is n / 2
  if n is odd, the next number in the sequence is 3n + 1
It is conjectured that every such sequence eventually reaches the number 1. Test this conjecture.

Bonus: What input n <= 1000000 gives the longest sequence?
'''
import array

'''Returns the next Collatz number'''
next_collatz_num = lambda n: int(n / 2) if n % 2 == 0 else int(3 * n + 1)

def new_memo(max_cache: int = 1000000):
    ''' Fixed length array for sequence lengths. arr[1] is initialized to 1. The rest to -1.'''
    arr = array.array('i', [-1]) * (max_cache + 1)
    arr[1] = 1
    return arr

def length_to_reach_one(start_num: int, max_iteration=10000) -> int:
    '''Returns the length of sequence to reach 1'''
    i, seq_num = 0, start_num
    while (i < max_iteration and seq_num != 1):
        seq_num = next_collatz_num(seq_num)
        print(i, seq_num)
        i = i + 1
    return i if seq_num == 1 else -1

def find_longest_seq_start_num(n: int) -> (int, int):
    '''Bonus: What input n <= 1000000 gives the longest sequence?
       Returns (num, longest len)
    '''

    longest_seq_len, start_num, memo = 0, 0, new_memo(n)

    # Try nums from 2 to n inclusive, recording longest sequence
    for i in range(2, n + 1):
        if i % 100000 == 0:
            print("start_num", i, "...")

        seq_num, k = i, 0

        # Because we start from small to large,
        # every time the sequence of numbers decreases
        # below the starting number, we've already
        # calculated the remaining starting length. So for even numbers
        # that happens after the first iteration.
        while (seq_num != 1  # Reached 1
               and seq_num >= i  # Not already processed
               ):
            k = k + 1
            seq_num = next_collatz_num(seq_num)
            #print ("\t", seq_num)

        seq_len = k + memo[seq_num]

        # Longest?
        if (seq_len > longest_seq_len):
            longest_seq_len = seq_len
            start_num = i
            print("\tnum,longest", start_num, longest_seq_len)

        # Write to memo.
        memo[i] = seq_len

    return start_num, longest_seq_len

#
# ASSERTIONS
#
assert (next_collatz_num(100) == 50)
assert (next_collatz_num(101) == 304)

assert (length_to_reach_one(1) == 0)
assert (length_to_reach_one(3) == 7)  # 10 5 16 8 4 2 1

# 871 has a length of 179
assert (find_longest_seq_start_num(1000) == (871, 179))

# 837799 has a length of 525
assert (find_longest_seq_start_num(1000000) == (837799, 525))
