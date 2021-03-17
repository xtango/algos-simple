/**
 *                      #181 [Hard] - SPLIT INTO PALINDROMES
 *
 * This problem was asked by Google.
 * 
 * Given a string, split it into as few strings as possible such that each string is a palindrome.
 * For example, given the input string racecarannakayak, return ["racecar", "anna", "kayak"].
 * Given the input string abc, return ["a", "b", "c"].
 */

const isPalindrome = (word: string) => {
    for (let i = 0; i < word.length >> 1; i ++) {
        if (word[i] !== word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

const splitIntoPalindromes = (str: string): string[] => {
    console.log('---split---', str )
    if (str.length === 0) {
        return [];
    }
    if (str.length === 1) {
        return [str]
    }

    const palindromes = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = str.length; j > i ; j--) {
            const word = str.substring(i, j + 1)
            console.log('word', word);
            if (isPalindrome(word)) {
                console.log('   -> palin');
                palindromes.push(word);
                const left = str.substring(0, i); 
                const leftPalins = splitIntoPalindromes(left);
                const right  = str.substring(j + 1)
                const rightPalins =  splitIntoPalindromes(right);
                console.log({left, right, leftPalins, rightPalins});
                break;
            }
        }
    }
    return palindromes;
}

/**
 * ASSERTIONS
 */
// console.log(isPalindrome('a') === true);
// console.log(isPalindrome('racecar') === true);
// console.log(isPalindrome('racecarx') === false);
console.log(splitIntoPalindromes('racecaranna'));
