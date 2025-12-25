/**
 * Turns each of the 4 digits 1 place up and down, returning 8 new combinations
 * example: nextStates('0000') -> ["1000", "9000", "0100", "0900", "0010", "0090", "0001", "0009"] 
 */
const UP = { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9', '9': '0' }
const DOWN = { '0': '9', '1': 0, '2': '1', '3': '2', '4': '3', '5': '4', '6': '5', '7': '6', '8': '7', '9': '8' }

const nextCombinations = (curr: string): string[] => {
    const states = []
    for (let i = 0; i < 4; i++) {
        const digit = curr[i];
        const left = curr.substring(0, i);
        const right = curr.substring(i + 1)
        const up = left + UP[digit] + right
        const down = left + DOWN[digit] + right
        states.push(up, down)
    }
    return states;
}

/**
 * BFS Search. This does NOT use a bi-directional BFS, so it is slow for certain cases and can time out. 
 */
const openLockSingleDirectional = (deadends: string[], target: string): number => {
    const CIRCUIT_BREAKER = 300;

    if (target === "0000") return 0

    const seen = new Uint8Array(10000)
    // Mark deadends in seen array
    for (let d of deadends)
        seen[parseInt(d)] = 1

    // BFS
    const q: [string, number][] = [['0000', 0]]; // tuple of (digits, numTurns)
    let iter = 0;
    while (q.length > 0 && iter < CIRCUIT_BREAKER) {
        console.log('iter, lenq', iter, q.length)
        const [digits, turns] = q.shift(); // our q goes from right to left
        if (digits === target) {
            return turns;
        }
        // const combs = nextCombinations(digits)
        const combs = getNeighbors(digits);
        console.log('combs for', digits, combs)
        combs.forEach(c => {
            const digitsAsInt = parseInt(c);
            if (!seen[digitsAsInt]) {
                seen[digitsAsInt] = 1;
                q.push([c, turns + 1]);
                iter++;
            }
        })
    }

    return -1; // not possible
}


/**
 * Bi-directional. Generally faster, but more complicated
 * We start with q1 initialized to '0000' and q2 initialized to the target.
 */
const openLockBiDirectional = (deadends: string[], target: string): number => {
    let deads = new Set(deadends);
    // base case
    if (deads.has("0000")) return -1;
    if (target === "0000") return 0;

    // Use a set instead of a queue to quickly determine if an element exists
    let q1 = new Set();
    let q2 = new Set();
    let visited = new Set();

    let step = 0;
    q1.add("0000");
    visited.add("0000");
    q2.add(target);
    visited.add(target);

    while (q1.size && q2.size) {
        // Increment the step count here
        step++;

        // The hash set cannot be modified during traversal,
        // so use newQ1 to store the neighbor nodes
        let newQ1 = new Set();

        // Get the neighbors of all nodes in q1
        for (let cur of q1) {
            // Add an unvisited neighboring node of a node to the set
            for (let neighbor of getNeighbors(cur)) {
                // Determine if the end point is reached
                if (q2.has(neighbor)) {
                    return step;
                }
                if (!visited.has(neighbor) && !deads.has(neighbor)) {
                    newQ1.add(neighbor);
                    visited.add(neighbor);
                }
            }
        }
        // newQ1 stores the neighbors of q1
        q1 = newQ1;
        // Because each BFS spreads q1, the set with fewer elements is used as q1
        if (q1.size > q2.size) {
            let temp = q1;
            q1 = q2;
            q2 = temp;
        }
    }

    return -1; // Not possible
};

// Turn s[j] up once
const plusOne = (s: string, j: number): string => {
    let ch = s.split('');
    if (ch[j] === '9')
        ch[j] = '0';
    else
        ch[j] = (parseInt(ch[j]) + 1).toString();
    return ch.join('');
}

// Turn s[i] down once
const minusOne = (s: string, j: number): string => {
    let ch = s.split('');
    if (ch[j] === '0')
        ch[j] = '9';
    else
        ch[j] = (parseInt(ch[j]) - 1).toString();
    return ch.join('');
}

const getNeighbors= (s: string): string[] => {
    let neighbors = [];
    for (let i = 0; i < 4; i++) {
        neighbors.push(plusOne(s, i));
        neighbors.push(minusOne(s, i));
    }
    return neighbors;
}


/**
 * Tests
 */
console.log(openLockBiDirectional(["8888"], "0009") === 1);
console.log(openLockBiDirectional(["0201", "0101", "0102", "1212", "2002"], "0202") === 6)
console.log(openLockBiDirectional(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888") === -1);


