/**
Given a dictionary of words and a string made up of those words (no spaces), 
return the original sentence in a list. If there is more than one possible
reconstruction, return any of them. If there is no possible reconstruction,
then return null.

For example, given the set of words 'quick', 'brown', 'the', 'fox', and the
string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].

Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the 
string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond]
or ['bedbath', 'and', 'beyond'].
*/
const reconstruct = (words: string[], input: string): string[] => {
    const originalWords: string[] = [];
    let matchWord = '';
    for (let i = 0; i < input.length; i++) {
        matchWord += input[i];
        if (words.indexOf(matchWord) > -1) {
            originalWords.push(matchWord);
            matchWord = '';
        }
    }
    return originalWords;
}

/**
 * TESTS
 */
const arrayEq = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

console.log(arrayEq(
    reconstruct(['quick', 'brown', 'the', 'fox'], 'thequickbrownfox'),
    ['the', 'quick', 'brown', 'fox'])
    ? 'passed'
    : 'failed');

console.log(arrayEq(
    reconstruct(['bed', 'bath', 'bedbath', 'and', 'beyond'], 'bedbathandbeyond'),
    ['bed', 'bath', 'and', 'beyond'])
    ? 'passed'
    : 'failed');
