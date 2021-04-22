/**
 *                              Problem #216 [Medium] - ROMAN TO DECIMAL
 * 
 * This problem was asked by Facebook.
 * 
 * Given a number in Roman numeral format, convert it to decimal.
 * The values of Roman numerals are as follows:
 * {
 *     'M': 1000,
 *     'D': 500,
 *     'C': 100,
 *     'L': 50,
 *     'X': 10,
 *     'V': 5,
 *     'I': 1
 * }
 * In addition, note that the Roman numeral system uses subtractive notation for numbers such as IV and XL.
 * For the input XIV, for instance, you should return 14.
 */

const VALUES: { [numeral: string]: number } = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
};

const romanToDec = (str: string): number => {
    let sum = VALUES[str[0]];
    for (let i = 1; i < str.length; i++) {
        const [prev, curr] = [VALUES[str[i - 1]], VALUES[str[i]]];
        sum += prev >= curr
            ? curr
            : curr - prev - prev; // subtraction rule
    }
    return sum;
}

/**
 * ASSERTIONS From wikipedia
 */
Object.entries({
    'VI': 6,
    'XXXIX': 39,
    'CCXLVI': 246,
    'MMCDXXI': 2421,
    //
    'CLX': 160,
    'CCVII': 207,
    'MIX': 1009,
    'MLXVI': 1066,
    //
    'MDCCLXXVI': 1776, // (the date written on the book held by the Statue of Liberty)
    'MCMXVIII': 1918, // (the first year of the Spanish flu pandemic)
    'MCMLIV': 1954, // (as in the trailer for the movie The Last Time I Saw Paris)
    'MMXIV': 2014 // (the year of the games of the XXII (22nd) Olympic Winter Games (in Sochi, Russia))
}
).forEach(([key, val]) => console.log(key, val, romanToDec(key) === val));
