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
    for (let i = 0; i < word.length >> 1; i++) {
        if (word[i] !== word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

const splitIntoPalindromes = (strInput: string): string[] => {
    let output: string[] = [];

    /**
     * Helper for recursion
     */
    const split = (str: string, depth: number = 0): string[] => {
        let palinSets: string[][] = [];
        console.log(`[depth: ${depth}] ${strInput}`);
        if (depth > 1) {
            return [];
        }

        if (strInput.length === 0) {
            return [];
        }
        if (strInput.length === 1) {
            return [strInput]
        }


        for (let i = 0; i < strInput.length; i++) {
            for (let j = strInput.length; j > i; j--) {
                const word = strInput.substring(i, j + 1);
                const left = strInput.substring(0, i);
                const right = strInput.substring(j + 1)
                console.log({ left, word, right });
                if (isPalindrome(word)) {
                    console.log('   -> palin');
                    const leftPalins = left.length > 0 ? splitIntoPalindromes(left, depth + 1) : [];
                    const rightPalins = right.length > 0 ? splitIntoPalindromes(right, depth + 1) : [];
                    console.log({ left, leftPalins, wordPalins: word, right, rightPalins });
                    palinSets.push(leftPalins.concat(word, rightPalins));
                    break;
                }
            }
        }

        console.log({palinSets});
        // return the smallest of the sets
        const freqs = palinSets.map(x=> { return { len: x.length, val: x}});
        freqs.sort( (a, b) => a.len - b.len);
        console.log('freqs', freqs)
        return freqs[0].val;
    }

    split(strInput);
    return output;
}

/**
 * ASSERTIONS
 */
// console.log(isPalindrome('a') === true);
// console.log(isPalindrome('racecar') === true);
// console.log(isPalindrome('racecarx') === false);
// console.log(splitIntoPalindromes('racecaranna'));
console.log(splitIntoPalindromes('puppy'));
