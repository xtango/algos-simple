/**
 *                  #161 [Easy] - REVERSE BITS
 * 
 * This problem was asked by Facebook.
 * 
 * Given a 32-bit integer, return the number with its bits reversed.
 * For example, given the binary number
 * 1111 0000 1111 0000 1111 0000 1111 0000, 
 * return 0000 1111 0000 1111 0000 1111 0000 1111.
 */

const reverseBits = (num: number): string =>
    num.toString(2) // Example: 4042322160 -> '11110000111100001111000011110000'
        .split('')
        .map(bit => bit === '1' ? '0' : '1').join('');

/**
 * ASSERTIONS
 */
// 0b11110000111100001111000011110000 is 4042322160
console.log(reverseBits(4042322160) === '00001111000011110000111100001111');
