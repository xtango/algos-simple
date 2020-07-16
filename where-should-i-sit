/**
 * Who Lives?
 *
 * Where should you sit in a round table of N members, where
 * every Kth member gets killed in a circular fashion.
 */
 
/**
 * In-place shift left
 */
const rotate = (arr: number[]) => {
    arr.push(arr[0]);
    arr.splice(0, 1);
}

const rotateKTimes = (arr: number[], k: number) => {
    for (let i = 0; i < k; i++) {
        rotate(arr);
    }
}

/**
 * Mimics lodash _.range(1, n+1)
 */
const rangeN = (n: number) => {
    const arr = [];
    for (let i = 1; i < n + 1; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * In-place rotation. Rotates k times and lops off the head of arr.
 */
const rotateChop = (arr: number[], k: number) => {
    rotateKTimes(arr, k);
    arr.splice(0, 1);
}

/**
 * Returns the index of who lives.
 *
 * @param N: number of persons numbered from 1..N
 * @param K: Every kth person to be eliminated. 
 * 
 * @example [1, 2, 3, 4] when k = 2, then eliminate 2 -> 4 -> 3, leaving 1 who lives
 */
const whoLives = (N: number, K: number): number => {
    const arr = rangeN(N);

    while (arr.length > 1) {
        rotateChop(arr, K - 1);
    }
    return arr[0];
}
console.log(whoLives(3, 1) === 3 ? 'Passed' : 'Failed');
console.log(whoLives(4, 2) === 1 ? 'Passed' : 'Failed');
console.log(whoLives(100, 2) === 73 ? 'Passed' : 'Failed');
