/**
 *                          #155 [Medium] - MAJORITY ELEMENT
 *
 * This problem was asked by MongoDB.
 * 
 * Given a list of elements, find the majority element, which appears more
 * than half the time (> floor(len(lst) / 2.0)).
 * You can assume that such element exists.
 * For example, given [1, 2, 1, 1, 3, 4, 0], return 1.
 */

type Elem = number | undefined;
type Dict = { [key: number]: number };

const majorityElem = (lst: number[]): Elem => {
    const freq: Dict = {};
    const halfLen = Math.floor(lst.length / 2);
    let majority: Elem = undefined;

    for (let i = 0; i < lst.length; i++) {
        const x = lst[i];
        // If not exists set to 1, else increment using bitwise NOT,
        // where ~undefined is -1, ~1 is -2, ~2 is 3 and so on.
        freq[x] = -~freq[x];
        if (freq[x] > halfLen) {
            majority = x;
            break;
        }
    }
    return majority;
}

/**
 * ASSERTIONS
 */
// Note: the problem statement example is wrong
console.log(majorityElem([1, 2, 1, 1, 3, 4, 0]) === undefined);

console.log(majorityElem([1, 2, 1, 1, 3, 4, 1]) === 1);
console.log(majorityElem([]) === undefined);
console.log(majorityElem([8, 9, 9]) === 9);
