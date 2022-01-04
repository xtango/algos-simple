/**
 *                  Problem #472 [Medium] - WAYS TO DECODE
 * 
 * This problem was asked by Facebook.
 * 
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
 * For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
 * You can assume that the messages are decodable. For example, '001' is not allowed.
 */

/**
 * The trick is to recognize two cases:
 * 
 *    Single digit: a: 1, b: 2,  ...i: 9, 
 *    Pair of digits: j: 10, k: 11, l: 12 ...z: 26
 * 
 * CASE 1: Ways = 2                            CASE B: Ways = 1 
 * (single + double digit decoding)            (31 > 26, so only single digit decoding)
 * 
 *     1->a + 1->a = 'aa'                         1->a + 3->c = 'ac'
 *   /                                           /
 * 11                                          31 
 *    \  
 *      11->k='k'                       
 */
const waysToDecode = (input: string): number => {
    /**
     * Recursion helper. Work our way from right to left 
     * with i as the pointer to input.
     */
    const countWays = (i: number): number => {
        // Base Case
        if (i < 0) {
            return 1;
        }

        let ways = 0;
        // Single digit can be decoded when right digit > '0'
        // Example When right digit is 1, we can decode to 'a'
        //         When right digit is 0, decoding is not possible
        if (input[i] > '0') {
            ways += countWays(i - 1);
        }

        // Pair (2nd to last and last) of digits possible
        // when 10..27
        const pair = parseInt(input.substring(i - 1, i + 1));
        if (pair > 9 && pair < 27) {
            ways += countWays(i - 2); // Recur skipping the next left
        }
        return ways;
    }

    return countWays(input.length - 1); // Start with rightmost
}

/**
 * ASSERTIONS
 */
console.log(waysToDecode('11') === 2);
console.log(waysToDecode('31') === 1);
console.log(waysToDecode('111') === 3);
