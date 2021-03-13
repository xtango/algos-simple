/**
 *                              #172 [Medium] - MATCH CONCATENATED WORDS
 * 
 * This problem was asked by Dropbox.
 * 
 * Given a string s and a list of words words, where each word is the same length, 
 * find all starting indices of substrings in s that is a concatenation of every 
 * word in words exactly once.
 * 
 * For example, given s = "dogcatcatcodecatdog" and words = ["cat", "dog"], return [0, 13],
 * since "dogcat" starts at index 0 and "catdog" starts at index 13.
 * 
 * Given s = "barfoobazbitbyte" and words = ["dog", "cat"], return [] 
 * since there are no substrings composed of "dog" and "cat" in s.
 * The order of the indices does not matter.
 */


/**
 * Recursive generation of permuations of arr using Heap's algo https://en.wikipedia.org/wiki/Heap%27s_algorithm
 */
const heapsPermute = (arr: string[], accum: string[] = [], k: number = arr.length): string[] => {
    if (k === 1) {
        accum.push(arr.slice(0));
    }

    for (let i = 0; i < k; i++) {
        // Recurse
        heapsPermute(arr, accum, k - 1);
        // Swap adjacent elemement
        k % 2
            // Odd
            ? [arr[0], arr[k - 1]] = [arr[k - 1], arr[0]]
            // Even
            : [arr[i], arr[k - 1]] = [arr[k - 1], arr[i]]
    }
    return accum
}

/**
 * Returns all substring indices of target matches in s.
 */
const stringFind = (s: string, target: string): number[] => {
    let i = 0;
    const startIndices = [];
    while (i < s.length) {
        if (
            // Start char matches? (to improved performance)
            s[i] === target[0] &&
            // End char matches? (to improve performance)
            s[i + target.length - 1] === target[target.length - 1]
            // substr matches?
            && s.substring(i, i + target.length) === target
        ) {
            startIndices.push(i);
            i += target.length;
        } else {
            i++;
        }
    }
    return startIndices;
}

const matchWordContenations = (s: string, words: string[]): number[] => {
    const perms = heapsPermute(words).map(x => x.join(''));
    //console.log('perms', perms);
    const accum: number[] = [];
    perms.forEach(perm => {
        const indices = stringFind(s, perm);
        indices.forEach(idx => accum.push(idx));
    });
    const sorted = accum.sort();
    return sorted;
}


/**
 * ASSERTIONS
 */
console.log(heapsPermute(['a', 'b', 'c']));
console.log(heapsPermute(['cat', 'dog']));
console.log(stringFind('dogdog', 'dog').join(',') === '0,3');
console.log(stringFind('dogabcdog', 'dog').join(',') === '0,6');
console.log(matchWordContenations('dogcatcatcodecatdog', ["cat", "dog"]).join(',') === '0,13');
console.log(matchWordContenations('barfoobazbitbyte', ["dog", "cat"]).join(',') === '');
