/**
 *                  Problem #239 [Medium] - UNLOCK PATTERNS
 * 
 * This problem was asked by Uber.
 * One way to unlock an Android phone is through a pattern of swipes across a 1-9 keypad.
 * For a pattern to be valid, it must satisfy the following:
 * All of its keys must be distinct.
 * It must not connect two keys by jumping over a third key, unless that key has already been used.
 * For example, 4 - 2 - 1 - 7 is a valid pattern, whereas 2 - 1 - 7 is not.
 * 
 * Find the total number of valid unlock patterns of length N, where 1 <= N <= 9.
 */

/**
 * Valid: n=4, 4 - 2 - 1 - 7        Invalid: n=3, 2 - 1 - 7
 *      1 - 2   3                       1 - 2  3
 *      | /                             |
 *      4   5   6                       4   5  6
 *      |                               |
 *      7   8   9                       7
 */

const unlockPatterns = (n: number) => {

}
