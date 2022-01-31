/**
 *                  #017 - Letter Combinations of a Phone Number
 * Medium
 * 
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations
 * that the number could represent. Return the answer in any order.
 * A mapping of digit to letters (just like on the telephone buttons) is given below.
 * Note that 1 does not map to any letters.
 */

// Note: Digits 7 and 9 are mapped to 4 characters
const DIGIT_TO_LETTERS = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

const getValidLetters = (idx: number) => DIGIT_TO_LETTERS[idx].split('');

/**
 * Returns all possible letter combinations of digits using a recursive DFS traversal.
 * 
 * @example '234'
 * Digit:                2               3            4
 *                    /  |  \          / | \        / | \ 
 * 1st              a    b   c       d   e  f      g  h  i
 *                / | \                  etc          etc
 * 2nd         d    e    f 
 *           /|\   /|\   /|\
 * 3rd      g h i  g h i g h i
 */
const letterCombinations = (digits: string): string[] => {
    const combos: string[] = [];

    const dfs = (path: string = '', digitIdx: number = 0) => {
        // Output when hit leaf, e.g. 'adg'
        if (path.length === digits.length) {
            combos.push(path);
            return;
        }

        const digit = parseInt(digits[digitIdx]);
        const validLetters = getValidLetters(digit);
        // console.log(`[${digitIdx}: ${digit}] path: ${path}, validLetters: ${validLetters}`);
        for (let letter of validLetters) {
            dfs(path + letter, digitIdx + 1);
        }
    }
    
    if (digits.length > 0) {
       dfs();
    }
    return combos;
};

/**
 * Assertions
 */
console.log(letterCombinations('23').join(',') === 'ad,ae,af,bd,be,bf,cd,ce,cf');
