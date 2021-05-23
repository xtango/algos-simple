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
    list.filter(x => x[0] === word[word.length - 1]); //  && x !== word);

const canFormChainCircle = (wordList: string[]): boolean => {
    const MAX_DEPTH = 10;
    const visited: string[] = [];

    const bfs = (q: string[], depth: number): boolean => {
        console.log(`[${depth}] q: ${JSON.stringify(q)}`);
        if (q.length === 0 || depth > MAX_DEPTH) {
            return false;
        }
        
        // Dequeue head
        const word = q.shift();                              // word=chair, q=[] -> racket, []       ->  touch, [tunic]
        visited.push(word);
        console.log('\tword:', word);

        const adjList = neighbors(wordList, word);
            // .filter(x => !visited.includes(x)); // adjs=[racket]    -> [touch, tunic]   ->  [height]
        if (adjList.includes(wordList[0])) {
            return true;
        }
        q = q.concat(adjList);
        console.log('\tadjList:', JSON.stringify(adjList));
        return bfs(q, depth + 1);
    }

    console.log('wordList:', JSON.stringify(wordList));
    return bfs([wordList[0]], 0);
}

/**
 * ASSERTION
 */
const WORDS1 = ['chair', 'height', 'racket', 'touch', 'tunic'];
console.log(JSON.stringify(neighbors(WORDS1, 'height')) === '["touch","tunic"]');
console.log(canFormChainCircle(WORDS1));

// Test unchaninable
// const WORDS2 = ['chair', 'height', 'racket', 'touch'];
// console.log(canFormChainCircle(WORDS2));
