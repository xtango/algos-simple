/**
 *                  #194 [Easy] - LINE SEGMENT INTERESECTIONS
 * 
 * This problem was asked by Facebook.
 * 
 * Suppose you are given two lists of n points, one list p1, p2, ..., pn
 * on the line y = 0 and the other list q1, q2, ..., qn on the line y = 1.
 * Imagine a set of n line segments connecting each point pi to qi.
 * Write an algorithm to determine how many pairs of the line segments intersect.
 */
 
interface Segment { p: number, q: number }

/**
 *  s2.q  s1.q
 *    \  /
 *     \/
 *     /\
 *    /  \
 * s1.p  s2.p
 */
const intersects = (s1: Segment, s2: Segment): number =>
    ((s1.p < s2.p) && (s2.q < s1.q)) || ((s1.p > s2.p) && (s2.q > s1.q))
        ? 1
        : 0;

const intersectingPairs = (pList: number[], qList: number[]): number => {
    let count = 0;
    for (let i = 0; i < pList.length; i++) {
        for (let j = i; j < pList.length; j++) {
            count += intersects(
                { p: pList[i], q: qList[i] },
                { p: pList[j], q: qList[j] });
        }
    }
    return count;
}

/**
 * ASSERTIONS
 */
console.log(intersectingPairs([6, 7, 8], [7, 8, 9]) == 0); // parallel
console.log(intersectingPairs([2, 10, 5], [3, 1, 3]) === 2);
