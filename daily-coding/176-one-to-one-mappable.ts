/**
 *            #176 [Easy] - ONE-TO-ONE CHAR MAPPABLE
 *
 * This problem was asked by Bloomberg.
 * Determine whether there exists a one-to-one character mapping from one string s1 to another s2.
 * For example, given s1 = abc and s2 = bcd, return true since we can map a to b, b to c, and c to d.
 * 
 * Given s1 = foo and s2 = bar, return false since the o cannot map to two characters.
 */

interface CharDictionary { [chr: string]: string };

const isOneToOne = (s1: string, s2: string): boolean => {
    if (s1.length !== s2.length) {
        return false;
    }

    const dict1: CharDictionary = {};
    const dict2: CharDictionary = {};
    for (let i = 0; i < s1.length; i++) {
        const [char1, char2] = [s1[i], s2[i]];
        const [mapped1, mapped2] = [dict1[char1], dict2[char2]];
    
        if (mapped1 === undefined) {
            dict1[char1] = char2;
        } else if (mapped1 !== char2) {
            return false;
        }

        if (mapped2 === undefined) {
            dict2[char2] = char1;
        } else if (mapped2 !== char1) {
            return false;
        }
    }

    return true;
}

/**
 * ASSERTIONS
 */
console.log(isOneToOne('dog', 'cat') === true);
console.log(isOneToOne('dog', 'caa') === false);
console.log(isOneToOne('foo', 'bar') === false);
