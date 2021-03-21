/**
 *                      #181 [Hard] - SPLIT INTO PALINDROMES
 *
 * This problem was asked by Google.
 * 
 * Given a string, split it into as few strings as possible such that each string is a palindrome.
 * For example, given the input string racecarannakayak, return ["racecar", "anna", "kayak"].
 * Given the input string abc, return ["a", "b", "c"].
 */

/**
 * Returns true when word is a palindrome by checking if head matches last and proceeding to the middle.
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
 * Recursive function to get all possible palindrome splits of strInput. 
 * Returns the one with fewest splits.
 */
const splitIntoPalindromes = (strInput: string, MAX_DEPTH = 20): string[] => {
    const splitsMemo: { [word: string]: string[] } = {};

    /**
     * Helper function for recursion.
     */
    const split = (str: string, depth: number = 0): string[] => {
        /**
         * Returns the splits for key by first looking it up in memo.
         */
        const getSplitsWithMemo = (key: string): string[] => {
            if (splitsMemo[key] === undefined) {
                if (key.length === 0) {
                    splitsMemo[key] = [];
                } else if (key.length === 1) {
                    splitsMemo[key] = [key];
                } else {
                    splitsMemo[key] = split(key, depth + 1);
                }
            }
            return splitsMemo[key];
        }

        let fewestSplits = str.split(''); // Initialize to array of single chars
        //console.log(`[depth: ${depth}] split('${str}')`);
        if (str === undefined ||
            str.length === 0 ||
            depth > MAX_DEPTH // Stop runaway recursion
        ) {
            return [];
        }

        if (isPalindrome(str)) {
            return [str]
        }

        for (let i = 1; i < str.length; i++) {
            // Example when str is 'abc' 
            // i: 1 -> ['a', 'bc'] 
            // i: 2 -> ['ab', 'c']
            const [left, word] = [str.substring(0, i), str.substring(i)];
            // console.log(`[depth: ${depth}]`, { i, left, word });
            const leftPalins = getSplitsWithMemo(left);
            const wordPalins = getSplitsWithMemo(word);
            const palins = leftPalins.concat(wordPalins);
            // console.log(`[depth: ${depth}]`, { leftPalins, wordPalins, palins });
            if (palins.length > 0 && palins.length < fewestSplits.length) {
                fewestSplits = palins;
            }
        }

        return fewestSplits;
    }

    return split(strInput, 0);
}

/**
 * ASSERTIONS
 */
console.log(isPalindrome('a') === true);
console.log(isPalindrome('racecar') === true);
console.log(isPalindrome('racecarx') === false);
console.log(splitIntoPalindromes('py').join('|') === 'p|y');
console.log(splitIntoPalindromes('pup').join('|') === 'pup');
console.log(splitIntoPalindromes('puppy').join('|') === 'pup|p|y');
console.log(splitIntoPalindromes('racecaranna').join('|') === 'racecar|anna');
console.log(splitIntoPalindromes('racecarannakayak').join('|') === 'racecar|anna|kayak');
