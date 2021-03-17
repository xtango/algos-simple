/**
 *                      #181 [Hard] - SPLIT INTO PALINDROMES
 *
 * This problem was asked by Google.
 * 
 * Given a string, split it into as few strings as possible such that each string is a palindrome.
 * For example, given the input string racecarannakayak, return ["racecar", "anna", "kayak"].
 * Given the input string abc, return ["a", "b", "c"].
 */

const isPalindrome = (word: string): boolean => {
    for (let i = 0; i < word.length >> 1; i++) {
        if (word[i] !== word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

/**
 * Helper for recursion
 */
const split = (str: string, depth: number = 0): string[] => {
    let palinSets: string[][] = [];
    console.log(`[depth: ${depth}] ${str}`);
    if (depth > 1) {
        return [];
    }

    if (str.length === 0) {
        return [];
    }
    if (str.length === 1) {
        return [str]
    }

    for (let i = 0; i < str.length; i++) {
        for (let j = str.length; j > i; j--) {
            const word = str.substring(i, j + 1);
            const left = str.substring(0, i);
            const right = str.substring(j + 1)
            console.log({ left, word, right });
            if (isPalindrome(word)) {
                console.log('   -> palin');
                const leftPalins = left.length > 0 ? split(left, depth + 1) : [];
                const rightPalins = right.length > 0 ? split(right, depth + 1) : [];
                console.log({ left, leftPalins, wordPalins: word, right, rightPalins });
                palinSets.push(leftPalins.concat(word, rightPalins));
                break;
            }
        }
    }

    console.log({ palinSets });
    // return the smallest of the sets
    const freqs = palinSets.map(x => { return { len: x.length, val: x } });
    freqs.sort((a, b) => a.len - b.len);
    console.log('freqs', freqs)
    return freqs[0].val;
}


const splitIntoPalindromes = (strInput: string): string[] => {
    return split(strInput, 0);
}

/**
 * ASSERTIONS
 */
// console.log(isPalindrome('a') === true);
// console.log(isPalindrome('racecar') === true);
// console.log(isPalindrome('racecarx') === false);
// console.log(splitIntoPalindromes('racecaranna'));
console.log(splitIntoPalindromes('puppy'));
