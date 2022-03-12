/**
 * Longest Dictionary word
 * 
 * Finds the longest set of words that can be made from letters in your hand (think SRABBLE!)
 * from a valid set of dictionary words. The letters can be shuffled in any possible way.
 * 
 * E.g. For letters "fgdo" and a dictionary = ["dog", "apple", "god"], the longest words
 * are: ["dog", "god"]
 */

interface ScoredWord { word: string; score: number }

const prettyScore = (sw: ScoredWord) => `${sw.word}: ${sw.score}`;

/**
 * Sorts the letters in st. 
 * @example sortLetters('bca') -> 'abc'
 */
const sortLetters = (letters: string): string => letters.split('').sort().join('');

/**
 * Returns the score of word
 */
const scoreWord = (word: string): ScoredWord => {
    return { word: word, score: word.length } // Naive implementation: score is just the lengh
}

const uniq = (words: string[]) => [...new Set(words)];

/**
 *  @example combinations("ab") => ["a", "ab", "b"]
 *  @example cobinations("abc") => ["a", "ab", "abc", "ac", "b", "bc", "c"]
 */
const combinations = (letters: string): string[] => {
    /**
     * Helper func for recursive calls. 
     * Basic idea: combo = prefix + head + combo(tail)
     */
    const combo = (accum: string[], prefix: string, rest: string) => {
        //console.log('combo accum', accum);
        for (let i = 0; i < rest.length; i++) {
            accum.push(prefix + rest[i]);
            combo(accum, prefix + rest[i], rest.substring(i + 1));
        }
        return accum;
    }

    return uniq(combo([], '', letters)); // uniq needed for duplicate letters
}

/**
 * Returns the set of scores for all valid combinations of the letters in hand.
 */
const score = (dict: string[], hand: string): [] => {
    const invertedDict = invertDict(dict);
    const sortedHand = sortLetters(hand);
    const combos = combinations(sortedHand);
    // console.log(`[SCORE] combos ${sortedHand} -> `, combos);
    const choices = combos
        .map(fragment => invertedDict[fragment])
        .filter(x => x !== undefined);
    //console.log(`[SCORE] Choices for ${hand} -> ${sortedHand}`, choices);

    return choices.flatMap(c => c.map(word => scoreWord(word)));
}

/**
 * Creates a { key -> [dictionaryWord]} object, where key is the sorted letters entry.
 * E.g. invertDict(['dog', 'god'] ) returns
 *      { dgo: [ 'god', 'dog']}
 */
const invertDict = (dict: string[]): { string: string[] } => {
    // SORTED LETTERS    -> REDUCE
    // --------------       ------------------
    // god  -> dgo     
    //                   -> {dgo: [god, dog] }
    // dog  -> dgo
    const lookup = dict.reduce((accum, x) => {
        const sorted = sortLetters(x);
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

/**
 * Tests
 */
const DICT = ['cat', 'mango', 'to', 'coat', 'dog', 'god'];
console.log('[TEST] Combos', combinations('abc').join(',') === 'a,ab,abc,ac,b,bc,c'
    ? 'passed'
    : 'failed');
console.log('Inverted..', invertDict(DICT));
console.log('Scores....', score(DICT, 'dgotcao').map(x => prettyScore(x)));
