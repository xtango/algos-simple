/**
 *                  Problem #366 [Medium] - ADJACENT CHARS NOT THE SAME
 * 
 * This problem was asked by Flexport.
 * 
 * Given a string s, rearrange the characters so that any two adjacent characters are 
 * not the same. If this is not possible, return null.
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
 * Uses a prioritized Q (non-optimized array we sort, highest frequency first).
 * Pops the 1st and 2nd and re-queues if the freq is non-zero.
 */
const rearrange = (input: string) => {
    let result: string = '';
    // Unique list of chars
    const charSet = new Set(input.split(''));

    // Frequency count of each uniq char
    const freq = countFreq(input);
    let q: string[] = sortQ(Array.from(charSet), freq);

    let prevChar = '';
    // Pop 1st (head) and 2nd (next) char as a pair
    while (q.length) {
        const headChar = q.shift();
        const nextChar = q.length ? q.shift() : undefined;

        // Decrement freq and push back if non-zero frequencies.
        // We will reprioritize the queue later.
        const pair = nextChar ? [headChar, nextChar] : [headChar];
        for (let i = 0; i < pair.length; i++) {
            const char = pair[i];
            // console.log('prev, current', prevChar, char);
            if (char === prevChar) {
                // No solution, since adjacent chars the same
                return null;
            }

            result += char;
            prevChar = char;
            const charFreqIdx = charOffset(char);
            freq[charFreqIdx] -= 1;
            if (freq[charFreqIdx] > 0) {
                q.push(char);
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
console.log(countFreq('aaaa')[0] == 4);
console.log(rearrange('aab') === 'aba');
console.log(rearrange('abacc') === 'acbac');
console.log(rearrange('yyz') === 'yzy');
console.log(rearrange('yyy') === null);
