/**
 *                      FEWEST COLORS - MIN SET COVER
 * 
 * Given a dictionary of button color preferences, find the fewest number 
 * of colors that would satisfy the preferences of all UI designers.
 * Write a function fewest(prefs) that returns back the colors as an array.
 * 
 * For example:
 * Input:  buttonColorPreferences = {
 *              Anita: 'wy', // which means Anita is good with White or Yellow
 *              Maurice: 'brw' //  Blue | Red | White
 *              Tina: 'g', // Green
 *         }
 * Output: fewest(buttonColorPreferences) should return ['w', 'g']
 */

/** 
 * Naive "min covered set" implementation.
 * 
 * @parms prefs List of preferences for each person. Example: ['wy', 'g', 'rwb']
 * @returns An array containing the shortest list of colors that satisfies every person.
 */
const fewest = (personPrefs: string[]): string[] => {
    const combos = getColorCombinations(personPrefs);
    for (let i = 0; i < combos.length; i++) {
        if (personPrefs.every(pref => matchAny(combos[i], pref))) {
            return combos[i].split(''); // return immediately
        }
    }
    return [];
}

/**
 * Determines whether the personPref is satisfied by the comboStr.
 * @example  matchAny("w",  "wy") returns true
 */
const matchAny = (comboStr: string, personPrefStr: string): boolean =>
    personPrefStr
        .split('')
        .some(x => comboStr.indexOf(x) > -1)

const getColorCombinations = (prefs: string[]): string[] => {
    const uniqColors = uniq(prefs.join('').split('')).join('');
    const combos = combinations(uniqColors);
    // Sort by increasing length. @example ["w", "y"... "wy", "wg" ...]
    combos.sort((a, b) => a.length - b.length);
    return combos;
}

/**
 *  @example combinations("rwbgy") => ["r", "rg", "rgb", "rb", "g", "gb", "b"]]
 */
const combinations = (colors: string): string[] => {
    /**
     * Helper func for recursive calls. 
     * Basic idea: combo = prefix + head + combo(tail)
     */
    const combo = (accum: string[], prefix: string, rest: string) => {
        for (let i = 0; i < rest.length; i++) {
            accum.push(prefix + rest[i]);
            combo(accum, prefix + rest[i], rest.substring(i + 1));
        }
        return accum;
    }

    return uniq(combo([], '', colors)); // uniq needed for duplicate letters
}

const uniq = (words: string[]): string[] => [...new Set(words)];

/**
 * ASSERTIONS
 */
console.log(combinations('rgb'))
console.log(fewest(['wy', 'g', 'rwb']).sort().join('') === 'gw')
