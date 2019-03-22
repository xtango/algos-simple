/**
 * CHALLENGE: Create groups of anagrams. 
 * An anagram is a word formed by rearranging the letters of another,
 * such as cinema, formed from iceman. (i.e. character order does not matter)
 */

/**
 * group(["iceman", "dog", "god", "iceman", "cinema"])
 * -> { aceimn: [iceman, iceman, cinema], dgo: [dog, god] }
 */
const group = (words) => {
    const g = {}; // Maps key (the sorted-word) to word-array. E.g. act -> [iceman, tac]

    words.forEach((w) => {
        const sorted = sortWord(w);
        if (!g[sorted]) { // Key does not exist
            g[sorted] = [];
        }
        
        if (g[sorted].indexOf(w) ===-1) {
          g[sorted].push(w);
        }
    });
    return g;
}

/**
 * 'cat' -> 'act'
 */
const sortWord = (w) => w.split('').sort().join('');

const pluckVals = (g) => Object.values(g);

/**
 * TEST
 */
const W = ["iceman", "dog", "god", "iceman", "cinema"];
const groupsStr = JSON.stringify(pluckVals(group(W)));
console.log(groupsStr === '[["iceman","cinema"],["dog","god"]]' ? 'Passed' : 'Failed');
