/**
 *               Problem #113 - REVERSE IN PLACE
 * 
 * This problem was asked by Google.
 * 
 * Given a string of words delimited by spaces, reverse the words in string.
 * For example, given "hello world here", return "here world hello"
 * 
 * Follow-up: given a mutable string representation, can you perform this operation in-place?
 * 
 * CONCEPTUAL MODEL
 * To do this in place in javascript we can use arrays (since strings are mutable in Javascript).
 */

const reverse = (s: string): string => {
    const words = s.split(' ')
    let out =  words[words.length - 1];
    let i = words.length - 2;
    while (i >= 0) {
        out = out + ' ' + words[i]
        i--;
    }
    return out;
}

/**
 * ASSERTIONS
 */
console.log(reverse('hello world here') === 'here world hello');
