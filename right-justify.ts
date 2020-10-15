/**
 * Right Justify Words
 * 
 * Pads words with spaces (here we use "_" for clarity) so that each line is a fixed width.
 * 
 * rightJustify(['Dry', 'bones', 'can', 'harm', 'no', 'one', 'in', 'the', 'room'], 10)
 * ->
 *      "Dry_bones" 
 *      "can__harm" 
 *      "no_one_in" 
 *      "the__room" 
 */
 
interface LineSplit {
    left: string[]; // Queue of processed words. Starts of empty.
    right: string[]; // Queue of Unprocessed words. Starts of full.
    rem: number; // Number of characters remaining, ie. Line width - Sum(Len of Left Words)
}

/** 
 * Takes as many words as possible with a space in between each, up to width and returns 
 * it in LineSplit.left. The remainer is in LineSplit.right.
 */
const take = (words: string[], width: number): LineSplit => {
    const leftQ = [];
    const rightQ = [...words];
    let remainingLen = width;

    while (rightQ.length && (rightQ[0].length <= remainingLen)) { // head can fit?
        leftQ.push(rightQ[0]); // push head
        remainingLen -= rightQ[0].length + 1; // add 1 for ' '
        rightQ.splice(0, 1); // pop head
    }

    return { left: leftQ, rem: remainingLen, right: rightQ };
}

/** 
 * Pretty prints a split line
 */
const prettySplit = (width: number, words: string[], left: string[], right: string[]): string =>
    `${width} ${words.join(' ')}  -> left: ${left.join(',')} -> right: ${right.join(',')}`;

/**
 * Returns an array of strings with padded spaces to the right of words until
 * pad(['let' 'us'], 6) -> ['let', ' ', 'us']
 */
const pad = (words: string[], remaingLen: number): string[] => {
    const paddedWords = [...words];
    let lenAvailable = remaingLen;
    let i = 0;
    while (lenAvailable > 0) {
        paddedWords[i] = paddedWords[i] + '_';
        // Circular next: When end is reached end, go back to head. Otherwise go to next word.
        i = i === words.length - 1 ? 0 : i + 1;
        lenAvailable--;
    }
    return paddedWords;
}


/**
 * Recursive func to split words into multiple lines. Each line's line is at most width.
 * Later these lines can be padded with pad().
 */
const splitIntoLines = (words: string[], width: number, accum: LineSplit): LineSplit[] => {
    const { left, rem, right } = take(words, width);
    // console.log('expandToLines() TAKE', prettySplit(width, words, left, right));
    const newAccum: LineSplit = { left: [...accum.left, ...left], rem, right: right };

    if (right.length > 0) {
        // recursive call
        const otherLines = splitIntoLines(right, width, newAccum);
        // current CONCAT otherLines
        return [{ left: left, right: right, rem }, ...otherLines];
    } else {
        return [{ left: left, rem: rem, right: right }];
    }
}

/**
 * Main driver func
 */
const rightJustify = (words: string[], width: number) => {
    const initState = { left: [], right: words, rem: width }; // Unprocessed words are in the right Q
    return splitIntoLines(words, width, initState)
        .map(l => pad(l.left, l.rem).join('_'));
}

/**
 * Tests
 */
console.log(take(['let', 'us', 'go'], 5).left.join('_') === 'let' ? 'passed' : 'failed');
console.log(take(['let', 'us', 'go'], 6).left.join('_') === 'let_us' ? 'passed' : 'failed');
console.log(pad(['Dry', 'bones'], 5).join('') === "Dry___bones__" ? 'passed' : 'failed');

const WORDS = ['Dry', 'bones', 'can', 'harm', 'no', 'one', 'in', 'the', 'room'];
rightJustify(WORDS, 10).forEach(line => console.log(line));
