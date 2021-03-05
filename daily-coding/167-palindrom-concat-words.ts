/**
 *                      #167 [Hard] - PALINDROME CONCATENATED WORDS
 * 
 *  This problem was asked by Airbnb.
 * 
 * Given a list of words, find all pairs of unique indices such that the concatenation of the two words is a palindrome.
 * For example, given the list ["code", "edoc", "da", "d"], return [(0, 1), (1, 0), (2, 3)].
 */

const isPalindrome = (str: string): boolean => {
    const mid = str.length << 1;
    for (let i = 0; i < mid; i++) {
        if (str[i] !== str[str.length - i - 1]) {
            return false
        }
    }
    return true;
}

const twoWordsPalindrom = (words: string[]): number[][] => {
    const indices = [];
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            const joined = words[i] + words[j];
            if (i !== j && isPalindrome(joined)) {
                indices.push([i, j]);
            }
        }
    }
    return indices
}

/**
 *  ASSERTIONS
 */
console.log(isPalindrome("a") === true);
console.log(isPalindrome("da") === false);
console.log(isPalindrome("dad") === true);
console.log(isPalindrome("abc") === false);
console.log(JSON.stringify(twoWordsPalindrom(["code", "edoc", "da", "d"])) === "[[0,1],[1,0],[2,3]]")
