/**
 *      SORT BY FREQUENCY
 */

const sortByFreq = (input: string): string => {
    const dict: { [key: string]: number } = {};

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        dict[ch] = dict[ch] === undefined ? 1 : dict[ch] + 1;
    }
    const sorted = Object.entries(dict)
        .sort((a, b) => b[1] - a[1]); // // gives [['c', 4], ['o, 2] ...
    return sorted.reduce((accum, x) => accum + x[0].repeat(x[1]), '')
}

/**
 * ASSERTIONS
 */
console.log(sortByFreq('aoocccc')); // === 'ccccooa');
