/**
 *                      #159 [Easy] - FIRST RECURRRING
 * 
 * This problem was asked by Google.
 * 
 * Given a string, return the first recurring character in it, or null if there is no recurring character.
 * For example, given the string "acbbac", return "b". Given the string "abcdef", return null.
 */

const firstRecurring = (str: string): string | null => {
    const memo = new Set();
    for (let i = 0; i < str.length; i++) {
        if (memo.has(str[i])) {
            return str[i];
        } else {
            memo.add(str[i]);
        }
    }
    return null;
}

/**
 * ASSERTIONS
 */
console.log(firstRecurring('acbbac') === 'b');
console.log(firstRecurring('') === null);
console.log(firstRecurring('abcdef') === null);
