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


type State = { stack: string[], accum: string };

const reverseWithDelimeters = (input: string, delims: string): string => {
    const word: State = { stack: [], accum: '' };
    const delim: State = { stack: [], accum: '' };

    console.log(`${'='.repeat(15)} REVERSE ${'='.repeat(15)}\n${input}`);

    const isDelim = (char: string): boolean => delims.indexOf(char) > -1;

    for (let i = 0; i < input.length; i++) {
        if (isDelim(input[i])) {
            if (delim.accum.length === 0) { // prev char was not a delim
                word.stack.push(word.accum);
                word.accum = '';
            }
            delim.accum += input[i];
        } else { // Not delim
            if (word.accum.length === 0 && delim.accum.length > 0) {
                delim.stack.push(delim.accum);
                delim.accum = '';
            }

            // Special case for last char
            if (i === input.length - 1) {
                word.stack.push(word.accum + input[i]);
            }

            word.accum += input[i];
        }

        console.log(`[${i} ${input[i]}]\nWord ${JSON.stringify(word)} \nDelim ${JSON.stringify(delim)}`);
    }


    let reversed = word.stack[word.stack.length - 1];
    let delimIdx = 0;
    for (let i = word.stack.length - 2; i >= 0; i--) {
        reversed += delim.stack[delimIdx] + word.stack[i];
        delimIdx++;
    }
    return reversed;
}

/**
 * ASSERTIONS
 */
// console.log(reverseWithDelimeters('hello/world:here', ':/') === 'here/world:hello'); // passes
// console.log(reverseWithDelimeters("hello//world:here", ':/') === 'here//world:hello'); // passes
console.log(reverseWithDelimeters('hello/world:here/', ':/')); // fails
