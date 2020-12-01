/**
 * LONGEST INCREASING SUB-SEQUENCE IN ARRAY
 * 
 * Methodology
 * Approach 1: Store longest to the left of i that's smaller than seq[i]. Perf: O(n^2)
 * Approach 2: Bin Tree. TODO. Should be faster for bigger n.
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
 *     maxSubs[i]: [8]        [1]      [1, 2]     [1, 2, 5]   [1, 2, 3]   [1, 2, 3, 4]     
 */
const lisa = (seq: Sequence): Sequence[] => {
    // The longest sub-sequence on the left-hand-side of i that's smaller that seq[i]
    const maxSubs: Array<Sequence> = new Array(seq.length);

    maxSubs[0] = [seq[0]]; // zero'th value

    for (let i = 1; i < seq.length; i++) {
        maxSubs[i] = [];
        const last = seq[i];
        // Sequential search for longest sub-seq to left of i. Values must be < the i'th val.
        // We'll concat 'last' outside the loop
        for (let j = 0; j < i; j++) {
            if (seq[j] < last && maxSubs[j].length > maxSubs[i].length) {
                maxSubs[i] = [...maxSubs[j]];
            }
        }
        // Concat last
        maxSubs[i].push(last);
        // console.log('after concat: i, maxSub[i]', i, longestSubs[i]);
    }
    return maxSubs;
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
