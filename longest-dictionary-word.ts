/**
 *  combo("ab") => ["a", "ab", "b"] 
 */
const combo = (s: string): string[] => {
    const helper = (accum: string[], prefix: string, rest: string) => {
        accum.push(prefix);
        for (let i = 0; i < rest.length; i++) {
            helper(accum, prefix + rest[i], rest.substring(i + 1));
        }
        return accum;
    }

    return helper([], '', s).filter(x => x !== '');
}
/**
 * Finds the longest set of words that can be made from letters in your hand (think SRABBLE!)
 * from a valid set of dictionary words. The letters can be shuffled in any possible way.
 * 
 * Example. If your letters = "fgdo" and the valid dictionary = ["dog", "apple", "god"]
 *          the longest words are ["dog", "god"]
 */
class LongestDictionaryWord {
    /**
     * Sorts the letters in st.
     * E.g. sortLetters('bca') -> 'abc'
     */
    static sortLetters(st: string): string {
        return st.split('').sort().join('');
    }

    /**
     * Creates a { key -> [dictionaryWord]} object, where key is the sorted letters entry.
     * E.g. invertDict(['dog', 'god'] ) returns
     *      { dgo: [ 'god', 'dog']}
     */
    static invertDict(dict: string[]): { string: string[] } {
        // SORTED LETTERS    -> REDUCE
        // --------------       ------------------
        // god  -> dgo     
        //                   -> {dgo: [god, dog] }
        // dog  -> dgo
        const lookup = dict.reduce((accum, x) => {
            const sorted = LongestDictionaryWord.sortLetters(x);
            if (accum[sorted]) {
                accum[sorted].push(x);
            } else {
                (accum[sorted] = []).push(x);
            }
            return accum;
        },
            {});
        return lookup;
    }

    static find(dict: string[], word: string): [] {
        const invertedDict = LongestDictionaryWord.invertDict(dict);
        const wordSorted = LongestDictionaryWord.sortLetters(word);

        // Simple Exact length match.
        // todo: use the combo function
        return invertedDict[wordSorted];
    }
}

/**
 * Tests
 */
console.log('Combinations of "abc"', combo('abc'));
console.log(LongestDictionaryWord.invertDict(['god', 'dog', 'to']));
console.log('Longest:', LongestDictionaryWord.find(['cat', 'mango'], 'tca'));
