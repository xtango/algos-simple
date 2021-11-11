/**
 *              418 [Easy] LINES OF CODE BONUS *** WIP ***
 * 
 * This problem was asked by Atlassian.
 * 
 * MegaCorp wants to give bonuses to its employees based
 * on how many lines of codes they have written. They would
 * like to give the smallest positive amount to each worker
 * consistent with the constraint that if a developer has
 * written more lines of code than their neighbor, they
 * should receive more money.
 * Given an array representing a line of seats of employees
 * at MegaCorp, determine how much each one should get paid.
 * 
 * For example, given [10, 40, 200, 1000, 60, 30], you 
 * should return [1, 2, 3, 4, 2, 1].
 */

const bonuses = (linesOfCode: number[]): number[] => {
    console.log('loc', linesOfCode);
    const payList = new Array(linesOfCode.length).fill(1);
    for (let i = 1; i < linesOfCode.length; i++) {
        // Greater than previous, bump up the bonus
        if (linesOfCode[i] > linesOfCode[i - 1]) {
            payList[i] = payList[i - 1] + 1;
        } else if (linesOfCode[i] < linesOfCode[i - 1]
            && payList[i] > payList[i - 1]) {
            payList[i - 1] = payList[i] + 1;
        }
    }
    return payList;
}

console.log(bonuses([10, 40, 200, 1000, 60, 30]))
