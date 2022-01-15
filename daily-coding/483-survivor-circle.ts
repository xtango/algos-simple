/**
 *                          Problem #483 [Easy] - SURVIVOR IN CIRCLE
 * 
 * This problem was asked by Bloomberg.
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
 *                   1    2   3   4   5      K = 2
 *  After Round 1:   1    x   3   x   5      Executed: 2, 4    Survivors: 1, 3, 5. 
 *  After Round 2:   x        3       x      Executed: 1, 5    Survivors: 3
 */

const range = (N:number, startFrom: number) => Array.from({length: N}, (_, k) => k+startFrom);

const locationToSurvive = (N: number, K: number): number => {
    const survivors: number[] = range(N, 1);
    while(survivors.length > 0) {
        survivors.splice(0, K);
        console.log(survivors);
    }
    return survivors[0];
}

console.log(locationToSurvive(5, 2));
