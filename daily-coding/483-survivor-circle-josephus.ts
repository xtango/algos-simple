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
 * Example N=5, K=2. 
 * 
 * Survivors after successive passes, with the person to be killed shown with an asterisk:
 *              1 2* 3 4 5
 *              1 3 4* 5
 *              1* 3 5
 *              3 5*
 *              3 <--
 */
const safePosition = (N: number, K: number): number => {
    const helper = (survivors: number[], startIdx: number): number => {
        if (survivors.length === 1) { // last survivor
            return survivors[0];
        }

        // SOLUTION TRICK: The start index for the remove cannot simply use K,
        //                 since the survivors array shrinks.
        const removeIdx = (startIdx + K - 1) % survivors.length;
        console.log(pretty(survivors, removeIdx));

        // Kill person by removing in-place
        survivors.splice(removeIdx, 1);

        // Recurse
        return helper(survivors, removeIdx);
    }

    return helper(
        range(N, 1), // 1, 2, ...N
        0);
}

/**
 * Formats list of survivors with the next person to be elimiated suffixed with an asterisk.
 * @example returns 1 2* 3 4 5
 */
const pretty = (survivors: number[], removeIdx: number): string =>
    survivors.map((x, idx) => `${x.toString()}${idx === removeIdx ? '*' : ''}`)
        .join(' ');

const range = (N: number, startFrom: number) => Array.from({ length: N }, (_, k) => k + startFrom);

/**
 * ASSERTIONS
 */
console.log(safePosition(5, 2) === 3);
