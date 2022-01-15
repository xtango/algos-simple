/**
 *                          #22 [Medium] - RECOSTRUCT SENTENCE
 * 
 * This problem was asked by Microsoft.
 * 
 * Given a dictionary of words and a string made up of those words (no spaces), 
 * return the original sentence in a list. If there is more than one possible
 * reconstruction, return any of them. If there is no possible reconstruction,
 * then return null.
 * 
 * For example, given the set of words 'quick', 'brown', 'the', 'fox', and the
 * string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
 * 
 * Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the 
 * string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond]
 * or ['bedbath', 'and', 'beyond'].
 */
const reconstruct = (words: string[], input: string): string[] | null => {
    const originalWords: string[] = [];
    let matchWord = '';
    for (let i = 0; i < input.length; i++) {
        matchWord += input[i];
        if (words.includes(matchWord)) {
            originalWords.push(matchWord);
            matchWord = ''; // reset
        }
    }

    // The sum of the length of the reconstructed words must match the input length
    const originalLen = originalWords.map(x => x.length).reduce((accum, x) => accum + x);

    return originalLen === input.length ? originalWords : null;
}


/**
 * ASSERTIONS
 */
const arrayEquals = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

 // 'quick' not in dict. Hence cannot reconstruct
console.log(reconstruct(['brown', 'the', 'fox'], 'thequickbrownfox') === null);

console.log(arrayEquals(
    reconstruct(['quick', 'brown', 'the', 'fox'], 'thequickbrownfox') || [],
    ['the', 'quick', 'brown', 'fox']));

console.log(arrayEquals(
    reconstruct(['bed', 'bath', 'bedbath', 'and', 'beyond'], 'bedbathandbeyond') || [],
    ['bed', 'bath', 'and', 'beyond']));
