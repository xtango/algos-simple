/**
 *                  CYCLE LENGTH
 * 
 * Finds the cycle length in arr, an array of integers. 
 * Approach: Follow each elem to the index it point to. 
 * Stop when a cycle is found & return length of the cycle (or -1 if no cycle found)
 *
 * @example cycleLen([1,0]) -> 2
 * @example cycleLen([1, 2, 0]) -> 3
 * @example cycleLen([1, 3, 6] -> -1)
 */

/**
 * A HashMap containing: { node: visitNumber, ... } 
 * used to compute the cycle length.
 * @example { 0: 1, 4: 2, 10: 3 } means
 *            Node 0 was visited 1st
 *                  Node 4 was visited 2nd
 *                         Node 10 was visited 3rd.
 */
type VisitMap = { [nodeNum: number]: number };

const cycleLen = (arr: number[]): number => {
    let [cycleFound, nodeNum, seq] = [false, 0, 1];
    const visitedOrder: VisitMap = {};

    while (!cycleFound && nodeNum < arr.length) {
        visitedOrder[nodeNum] = seq;
        //console.log(seq, idx, visitSequence[idx]);
        seq++;
        nodeNum = arr[nodeNum];
        if (visitedOrder[nodeNum]) cycleFound = true;
    }

    return cycleFound ? seq - visitedOrder[nodeNum] : -1;
}

/**
 *  ASSERTIONS
 */
console.log(cycleLen([1, 0]) === 2);
console.log(cycleLen([1, 2, 0]) === 3);
