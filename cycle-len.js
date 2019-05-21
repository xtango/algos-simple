/**
 * Finds the cycle length in arr. Follow each elem to the index it point to. 
 * Stop when a cycle is found and return length of the cycle (or -1 if no cycle found)
 * e.g.
 *    cycleLen([1,0]) -> 2
 *    cycleLen([1, 2, 0]) -> 3
 *    cycleLen([1, 3, 6] -> -1)
  */
function cycleLen(arr) {
    let cycleFound = false;
    let idx = 0;
    let seq = 1;

    // Visit Sequence is in the form { node: vistitNumber} 
    // e.g. { 0: 1, 4: 2, 10, 3 } to mean 0 was visited 1st, and 4 was visited 2nd, 10 was visited 3rd.
    let visitSequence = {}; 
    while (!cycleFound && idx < arr.length) {
        visitSequence[idx] = seq;
        console.log(seq, idx, visitSequence[idx]);
        seq++;
        idx = arr[idx];
        if (visitSequence[idx]) cycleFound = true;
    }

    return cycleFound ? seq - visitSequence[idx] : -1;
}

// Tests
if (cycleLen([1, 0]) === 2) console.log('passed')
if (cycleLen([1, 2, 0]) === 3) console.log('passed')
