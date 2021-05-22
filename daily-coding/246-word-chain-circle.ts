/**
 *                                  #246 [Medium] - WORD CHAIN CIRCLE
 *
 * This problem was asked by Dropbox.
 * 
 * Given a list of words, determine whether the words can be chained to form a circle.
 * A word X can be placed in front of another word Y in a circle if the last character
 * of X is same as the first character of Y.
 * 
 * For example, the words 
 * ['chair', 'height', 'racket', touch', 'tunic'] can form the following circle:
 * chair --> racket --> touch --> height --> tunic --> chair
 */

const neighbors = (list: string[], word: string): string[] =>
    list.filter(x => x[0] === word[word.length - 1])

const canFormChainCircle = (wordList: string[]): boolean => {
    const MAX_DEPTH = 10;

    const bfs = (q: string[], depth: number): boolean => {
        if (q.length === 0 || depth > MAX_DEPTH) {
            return false;
        }

        console.log(`[${depth}] ${q.join(' ')}`);

        // Dequeue head
        const word = q.shift();                    // word=chair, q=[] -> racket, []       ->  touch, [tunic]
        console.log('word:', word);

        const adjList = neighbors(wordList, word); // adjs=[racket]    -> [touch, tunic]   ->  [height]
        q = q.concat(adjList);
        console.log('word, adjList', word, adjList);
        return bfs(q, depth + 1);
    }

    console.log(wordList);
    return bfs([wordList[0]], 0);
}
const WORDS = ['chair', 'height', 'racket', 'touch', 'tunic'];
console.log(JSON.stringify(neighbors(WORDS, 'height')) === '["touch","tunic"]');
console.log(canFormChainCircle(WORDS));
