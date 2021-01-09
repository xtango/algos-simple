/**
 *          Problem #114 [Hard] - REVERSE WORDS MAINTAINING DELIMITER ORDER
 * 
 * This problem was asked by Facebook.
 *
 * Given a string and a set of delimiters, reverse the words in the string while
 * maintaining the relative order of the delimiters. 
 * For example, given "hello/world:here", return "here/world:hello"
 * 
 * Follow-up: Does your solution work for the following cases:
 * "hello/world:here/",
 * "hello//world:here"
 */

const reverseWithDelimeters = (input: string, delims: string): string => {
    console.log(`${'='.repeat(15)} REVERSE ${'='.repeat(15)}\n${input}`);
    const isDelim = (char: string): boolean => delims.indexOf(char) > -1;

    const wordStack: string[] = [];
    const delimStack: string[] = [];
    let wordAccum = ''; //  word accumulator, e.g. 'her'
    let delimAccum = ''; //  delimiter accumulator, e.g. '//'

    for (let i = 0; i < input.length; i++) {
        if (isDelim(input[i])) {
            if (delimAccum.length === 0) { // prev char was not a delim
                wordStack.push(wordAccum);
                wordAccum = '';
            }
            delimAccum += input[i];
        } else {
            if (wordAccum.length === 0 && delimAccum.length > 0) {
                delimStack.push(delimAccum);
                delimAccum = '';
            }

            // Special handlinkg for last char
            if (i === input.length - 1) {
                wordStack.push(wordAccum + input[i]);
            }

            wordAccum += input[i];
        }

        console.log('[word: accum, stack ]', wordAccum, wordStack);
        console.log('[delim: accum, stack]', delimAccum, delimStack);
    }

    let reversed = wordStack[wordStack.length - 1];
    let delimIdx = 0;
    for (let i = wordStack.length - 2; i >= 0; i--) {
        reversed += delimStack[delimIdx] + wordStack[i];
        delimIdx++;
    }
    return reversed;
}

/**
 * ASSERTIONS
 */
console.log(reverseWithDelimeters('hello/world:here', ':/') === 'here/world:hello'); // passes
console.log(reverseWithDelimeters("hello//world:here", ':/') === 'here//world:hello'); // passes
//console.log(reverseWithDelimeters('hello/world:here/', ':/')); // fails
