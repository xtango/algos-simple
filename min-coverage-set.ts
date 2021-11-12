/**
 *                      WIP
 * 
 * Given a dictionary of button color preferences, find the fewest number 
 * of colors that would satisfy the preferences of all UI designers.
 * Write a function fewest(prefs) that returns back the colors as an array.
 * 
 * For example:
 * Input:  buttonColorPreferences = {
 *           Maurice: [ Red, White, Blue],
 *           Tina: [ Green],
 *           Anita: [ White, Yellow] // which means Anita is good with White or Yellow
 *         }
 *
 * Output: fewest(buttonColorPreferences) should return ['White', 'Green']
 */

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

const uniq = (words: string[]) => [...new Set(words)];

/** 
 * Naive "min covered set" algo.
 */
const fewest = (prefs: string[]) => {
    const uniqColors = uniq(prefs.join('').split('')).join('');
    const combos = combinations(uniqColors);
    // Sort by increasing length
    combos.sort((a, b) => a.length - b.length); // Example: ["w", "y"... "wy", "wg" ...]

    for (let i = 0; i < combos.length; i++) {
        for (let p = 0; p < prefs.length; p++) {
            // todo:
        }
    }

    console.log(combos);
}


/**
 * ASSERTIONS
 */
console.log(combinations('rgb'))

/**
 * Anita: [ White, Yellow] // which means Anita is good with White or Yellow
 * Tina: [ Green],
 * Maurice: [ Red, White, Blue],
 */
console.log(fewest(['wy', 'g', 'rwb']) === 'gw')
