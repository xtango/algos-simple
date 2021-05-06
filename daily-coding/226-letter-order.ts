/**
 *              Problem #226 [Hard] - LETTER ORDER

This problem was asked by Airbnb.

You come across a dictionary of sorted words in a language you've never seen before. 
Write a program that returns the correct order of letters in this language.

For example, given ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'], you should return ['x', 'z', 'w', 'y'].
*/
const adjacentPairs = (words: string[]) => {
    const pairs = [];
    for (let i = 1; i < words.length; i++) {
        pairs.push([words[i - 1], words[i]]);
    }
    return pairs;
}

/**
 * 
 * For the adjacent pair (left, right) returns a list of the i'th char on left and right
 * 
 * @example ['xww', 'wxyz'] returns [[x w], [w x], [w y]]
 */
const zipChars = (pair: string[]): string[] => {
    const zipped = [];
    for(let i = 0; i < Math.min(pair[0].length, pair[1].length); i++) {
        zipped.push([pair[0][i], pair[1][i]]);
    }
    return zipped;
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(adjacentPairs(['a', 'b', 'c', 'd'])) === '[["a","b"],["b","c"],["c","d"]]');
console.log(JSON.stringify(zipChars(['xww', 'wxyz'])) === '[["x","w"],["w","x"],["w","y"]]');
const WORDS = ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'];
