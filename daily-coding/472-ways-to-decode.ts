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
 *    a: 1, b: 2,  ...  k: 11, l: 12
 */
const charToNum = (ch: string): number => ch.codePointAt(0) - 96;

const numToChar = (num: number): string => String.fromCharCode(num + 96);

const getDecodeMap = (): { [key: string]: string } => {
    const dm: { [key: string]: string } = {};
    for (let i = 1; i < 27; i++) {
        const key: string = i.toString();
        dm[key] = numToChar(i);
    }
    return dm;
}

// 11: [k, aa]
const numWaysToEncode = (): number => {
    return -1;
}

/**
 * ASSERTIONS
 */
console.log(charToNum('k') === 11);
console.log(numToChar(1));
console.log(getDecodeMap());
