/**
 *                              WHO ELECTED
 * 
 * Returns the student # (index starting with 1) who remains after eliminating the Kth student
 * of a circle of N students
 */

/**
 * Returns in a 1...N array mimicing range(1, N) in python
 */
const range1To = (N: number): number[] => {
    const range = [...Array(N + 1).keys()]
    range.splice(0, 1);
    return range;
}

const who = (N: number, K: number): number => {
    let indexToRemove = 0;
    let range = range1To(N);
    while (range.length > 1) {
        indexToRemove = (indexToRemove + K - 1) % range.length

        // In place pop 
        range.splice(indexToRemove, 1)
    }
    return range[0];
}

/**
 * TESTS
 */
console.log(who(1, 1) == 1)
console.log(who(4, 2) == 1)
console.log(who(100, 2) == 73)
