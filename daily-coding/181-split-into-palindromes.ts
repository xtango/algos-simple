
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
    // let palinSets: string[][] = [];
    let splitsFewest = str.split('');
    console.log(`SPLIT [depth: ${depth}] ${str}`);
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
            const word = str.substring(i, j );
            const left = str.substring(0, i);
            const right = str.substring(j)
            console.log({ i, j, left, word, right });
            if (isPalindrome(word)) {
                console.log(`-> ${word} IS A PALINDROME`);
                const leftPalins = left.length === 0 ? [] : left.length === 1 ? [left] :  split(left, depth + 1);
                const rightPalins = right.length === 0 ? [] : right.length === 1 ? [right] :  split(right, depth + 1);
                const palins = leftPalins.concat(word, rightPalins)
                console.log('palins:', palins);
                if (palins.length < splitsFewest.length) {
                    console.log('\tSetting fewest to', palins);
                    splitsFewest = palins;
                }
                console.log({ left, leftPalins, wordPalins: word, right, rightPalins, splitsFewest });
                break;
            }
        }
    }

    return splitsFewest;
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
// console.log(splitIntoPalindromes('py'));
console.log(splitIntoPalindromes('puppy'));
