/**
 *                          Problem #483 [Easy] - SURVIVOR IN CIRCLE
 * 
 * This problem was asked by Bloomberg.
 * 
 * There are N prisoners standing in a circle, waiting to be executed.
 * The executions are carried out starting with the kth person, and removing
 * every successive kth person going clockwise until there is no one left.
 * 
 * Given N and k, write an algorithm to determine where a prisoner should
 * stand in order to be the last survivor.
 * 
 * For example, if N = 5 and k = 2, the order of executions would be
 *      [2, 4, 1, 5, 3], so you should return 3.
 * Bonus: Find an O(log N) solution if k = 2.
 */

/**
 * @see https://en.wikipedia.org/wiki/Josephus_problem
 * 
 *                   1    2   3   4   5      K = 2
 *  After Round 1:   1    x   3   x   5      Executed: 2, 4    Survivors: 1, 3, 5. 
 *  After Round 2:   x        3       x      Executed: 1, 5    Survivors: 3
 */
const safePosition = (N: number, K: number): number => {
    const helper = (survivors: number[], startIdx: number): number => {
        // console.log(`[${startIdx}] ${survivors.join()}`);
        if (survivors.length === 1) { // last survivor
            return survivors[0];
        }

        // TRICK TO SOLUTION: The start index for the remove cannot simply be K, 
        //                    since the survivors array shrinks.
        const removeIdx = (startIdx + K - 1) % survivors.length;
        // console.log(`\tremove [${removeIdx}] = ${survivors[removeIdx]}`);
        
        // Kill person by removing in-place
        survivors.splice(removeIdx, 1);
        
        // Recurse
        return helper(survivors, removeIdx);
    }

    return helper(
        range(N, 1), // 1, 2, ...N
        0);
}

const range = (N: number, startFrom: number) => Array.from({ length: N }, (_, k) => k + startFrom);

/**
 * ASSERTIONS
 */
console.log(safePosition(5, 2) === 3);
