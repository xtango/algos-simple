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
    if (word.length === 1) {
        return true;
    }

    const halfWay = word.length >> 1;
    for (let i = 0; i < halfWay; i++) {
        if (word[i] !== word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

const splitIntoPalindromes = (strInput: string, MAX_DEPTH = 20): string[] => {
    const splitsMemo: { [word: string]: string[] } = {};

    /**
     * Helper for recursion. Get all possible palindrom splits of str and
     * select the fewest splits.
     */
    const split = (str: string, depth: number = 0): string[] => {
        const getSplitWithMemo = (key: string): string[] => {
            if (key.length === 0) {
                return [];
            } else if (key.length === 1) {
                return [key];
            }

            if (splitsMemo[key] === undefined) {
                const splits = split(key, depth + 1);
                console.log(`[depth: ${depth}]`, { splitsMemo })
                if (splits.length > 0) {
                    splitsMemo[key] = splits;
                }
            }
            return splitsMemo[key];
        }

        let fewestSplits = str.split(''); // Initialize to array of single chars
        console.log(`[depth: ${depth}] split('${str}')`);
        if (str === undefined ||
            str.length === 0 ||
            depth > MAX_DEPTH// Stop runaway recursion
        ) {
            return [];
        }

        if (isPalindrome(str)) {
            console.log(`-> ${str} IS A PALINDROME`);
            return [str]
        }

        for (let i = 0; i < str.length; i++) {
            // Example str = 'abc' 
            // i: 0 -> ['', 'abc']
            // i: 1 -> ['a', 'bc'] 
            // i: 2 -> ['ab', 'c']
            const [left, word] = [str.substring(0, i), str.substring(i)];
            console.log(`[depth: ${depth}]`, { i, left, word });

            const leftPalins = getSplitWithMemo(left);
            const wordPalins = getSplitWithMemo(word);
            const palins = leftPalins.concat(wordPalins);
            console.log(`[depth: ${depth}]`, { leftPalins, wordPalins, palins });
            if (palins.length > 0 && palins.length < fewestSplits.length) {
                console.log(`[depth: ${depth}] ${word} Setting fewest to`, palins);
                fewestSplits = palins;
            }
            console.log({ left, leftPalins, word, wordPalins, fewestSplits });
        }

        return fewestSplits;
    }

    const output = split(strInput, 0);
    console.log('output', output);
    return output;
}

/**
 * ASSERTIONS
 */
// console.log(isPalindrome('a') === true);
// console.log(isPalindrome('racecar') === true);
// console.log(isPalindrome('racecarx') === false);
// console.log(splitIntoPalindromes('racecaranna'));
// console.log(splitIntoPalindromes('py'));
//console.log(splitIntoPalindromes('pup'));
console.log(splitIntoPalindromes('puppy'));
