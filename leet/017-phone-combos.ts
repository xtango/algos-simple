/*
Letter Combinations of a Phone Number
Medium

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
*/

const mapDigitToLetters = (digit: string): string[] => {
    const mapping: {[key: string]: string[]} = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f']
    }
    return mapping[digit];
}

const letterCombinations = (digits: string): string[] => {
    
    const helper = ()
        for (let i = 0; i < digits.length; i++) {
            
        }
    }
    return [];
};

/**
 * assertions
 */
console.log( mapDigitToLetters('2').join('') === 'abc')

letterCombinations('23')
