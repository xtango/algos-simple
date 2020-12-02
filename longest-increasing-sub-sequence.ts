/**
 * LONGEST INCREASING SUB-SEQUENCE IN ARRAY
 * 
 * A subsequence is a sequence that can be derived from another sequence by deleting some or
 * no elements without changing the order of the remaining elements.
 *
 * Methodology
 * Approach 1: O(n^2)   Uses memoization to record the longest sub-seq to the left of i that's smaller than seq[i]. 
 * Approach 2: O(log N) Uses a PATIENCE SORT https://en.wikipedia.org/wiki/Patience_sorting
 */

type Sequence = number[];

/**
 * Returns the Longest Increasing subsequences for each i.
 * 
 * Moving from left to right we keep a memo of the longest sub-seq we find to the left of i:
 *  max[i] = maxSeq(left[i] where values < Seq[i]) CONCAT Last
 * 
 *              i:  0          1          2           3           4           5
 *      Given seq:  8          1          2           5           3           4
 * 
 *     memo[i]: [8]        [1]      [1, 2]     [1, 2, 5]   [1, 2, 3]   [1, 2, 3, 4]     
 */
const lisa = (seq: Sequence): Sequence[] => {
    // The longest sub-sequence on the left-hand-side of i that's smaller that seq[i]
    const memo: Array<Sequence> = new Array(seq.length);

    memo[0] = [seq[0]]; // zero'th value

    for (let i = 1; i < seq.length; i++) {
        memo[i] = [];
        const last = seq[i];
        // Sequential search for longest sub-seq to left of i. Values must be < the i'th val.
        // We'll concat 'last' outside the loop
        for (let j = 0; j < i; j++) {
            if (seq[j] < last && memo[j].length > memo[i].length) {
                memo[i] = [...memo[j]];
            }
        }
        // Concat last
        memo[i].push(last);
        // console.log('after concat: i, maxSub[i]', i, longestSubs[i]);
    }
    return memo;
}

/**
* Patience sort
*
* The algorithm's name derives from a simplified variant of the patience card game. 
* The game begins with a shuffled deck of cards. The cards are dealt one by one into
* a sequence of piles on the table, according to the following rules.
* 
* Initially, there are no piles. The first card dealt forms a new pile consisting of 
* the single card. Each subsequent card is placed on the leftmost existing pile whose 
* top card has a value greater than or equal to the new card's value, or to the right 
* of all of the existing piles, thus forming a new pile. When there are no more cards
* remaining to deal, the game ends.
*
* This card game is turned into a two-phase sorting algorithm, as follows. Given an 
* array of n elements from some totally ordered domain, consider this array as a 
* collection of cards and simulate the patience sorting game. When the game is over,
* recover the sorted sequence by repeatedly picking off the minimum visible card;
* in other words, perform a k-way merge of the p piles, each of which is internally sorted.
*
* TODO
*/
const patience = () => {

}

/**
 * Sorts longest first.
 */
const sortSeq = (seqList: Sequence[]): Sequence[] => {
    const clone = [...seqList]
    clone.sort(x => x.length * -1)
    return clone;
}

/**
 * Tests
 */
console.log(sortSeq(lisa([1, 2, 3]))[0]);
console.log(sortSeq(lisa([10, 2, 3, 1, 30, 32, 5, 6, 7]))[0]);
