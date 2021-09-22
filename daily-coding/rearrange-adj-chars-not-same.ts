/**
 *                  Problem #366 [Medium] - ADJACENT CHARS NOT THE SAME
 * 
 * This problem was asked by Flexport.
 * 
 * Given a string s, rearrange the characters so that any two adjacent characters are 
 * not the same. If this is not possible, return null.\
 * 
 * For example, if s = yyz then return yzy. If s = yyy then return null.
 */

/**
 * Returns the ascii position offset from the char 'a'
 */
const charOffset = (str: string, idx: number = 0) => str.charCodeAt(idx) - 'a'.charCodeAt(0);

const countFreq = (input: string): number[] => {
    const freq = new Array(26).fill(0);
    for (let i = 0; i < input.length; i++) {
        freq[charOffset(input, i)] += 1;
    }
    return freq;
}

/**
 * Descending sort with highest occurances 1st
 */
const sortQ = (q, freq) => q.sort((a, b) => freq[charOffset(b, 0)] - freq[charOffset(a, 0)]);

/**
 * Uses a prioritized Q (non-optimized array that is sorted, highest frequency first).
 * Pops the highest and requeus if the freq is non-zero.
 */
const rearrange = (input: string) => {
    let result: string = '';
    // Unique list of chars
    const charSet = new Set(input.split(''));

    // Frequency count of each uniq char
    const freq = countFreq(input);
    let q: string[] = sortQ(Array.from(charSet), freq);

    while (q.length) {
        // Pop head
        const headChar = q.shift(); // pop head
        // console.log('-> ', headChar);
        result += headChar;
        const headFreqIdx = charOffset(headChar);
        freq[headFreqIdx] -= 1;
        if (freq[headFreqIdx] > 0) {
            q.push(headChar);
        }

        // Pop the next char
        if (q.length) {
            const nextChar = q.shift();
            if (headChar === nextChar) {
                // No solution
                return null;
            }
            // console.log('-> ', nextChar);
            result += nextChar;
            const nextFreqIdx = charOffset(nextChar);
            freq[nextFreqIdx] -= 1;
            if (freq[nextFreqIdx] > 0) {
                q.push(nextChar);
            }
        }

        // Re-prioritize the q
        q = sortQ(q, freq);
    }

    return result;
}

/**
 * ASSERTIONS
 */
console.log('freq', countFreq('aaaa')[0] == 4);
console.log(rearrange('aab') === 'aba');
console.log(rearrange('abacc') === 'acbac');
console.log(rearrange('yyy') === null); // No solution
