/**
 * Sliding Window Max
 */
 
/**
 * Double-Edged-Queue. Stores values in descending order
 */
type DEQ = number[];

/**
 * Pops until we find an elem thats larger. Then pushes at right.
 * 
 * @example deqPushSorted([3, 2, 0], 1) -> [3, 2, 1]
 * @example deqPushSorted([3, 2, 0], 4) -> [4]
 */
const deqPushSorted = (q: DEQ, val: number): DEQ => {
    while (q.length > 1 && val > q[q.length -1]) {
        q = deqPopRight(q);
    }
    q.push(val);
    return q;
}
/**
 * Returns a new q without the right-most elem.
 */
const deqPopRight = (q: DEQ): DEQ => q.slice(0, q.length -1);

/**
 * Assertions
 */
console.log(deqPopRight([1,2,3]).join(',') == '1,2');
console.log(deqPushSorted([], 3).join(',') === '3');
console.log(deqPushSorted([3, 2, 0], 1).join(',') === '3,2,1');
console.log(deqPushSorted([3, 2, 0], 4).join(',') === '4');
 
