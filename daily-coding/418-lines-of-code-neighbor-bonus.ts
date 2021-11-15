/**
 *              418 [Easy] LINES OF CODE BONUS
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

interface Band { direction: number, startIdx: number, endIdx: number };

/**
 * Breaks up the series into rising 1, flat 0, and falling -1 segments.
 * Returns the start and end indices of each band.
 */
const getBands = (linesOfCode: number[]): Band[] => {
    const bands: Band[] = []; // list of (dir, start, end)
    let direction = linesOfCode[1] > linesOfCode[0]
        ? 1 // rising
        : linesOfCode[1] < linesOfCode[0] ? -1 //  falling
            : 0;
    let startIdx = 0;
    for (let i = 1; i < linesOfCode.length; i++) {
        const [prev, curr] = [linesOfCode[i - 1], linesOfCode[i]];
        if (curr > prev && direction === -1) {
            // Turning point from falling to rising
            bands.push({ direction, startIdx, endIdx: i - 1 });
            startIdx = i;
            direction = 1;
        } else if (curr < linesOfCode[i - 1] && direction === 1) {
            // Turning point from rising to falling
            bands.push({ direction, startIdx, endIdx: i - 1 });
            startIdx = i;
            direction = -1;
        }
    }
    // Last band
    bands.push({ direction, startIdx, endIdx: linesOfCode.length - 1 })
    return bands;
}

/**
 * Approach
 *                       |
 *                  |    |
 *              |   |    |    |
 *           |  |   |    |    |    |
 *          10  40 200 1000  60   30
 *          |--rising----|-falling-|
 *            
 *         $1   2   3    4    2    1
 * - Rising band: Increment by 1 starting from $1.
 * - Falling band: Decrement by 1 starting from $x, where x is the band's length.
 */
const bonuses = (linesOfCode: number[]): number[] => {
    const bonusList: number[] = [];
    const bands = getBands(linesOfCode);
    bands.forEach(band => {
        const len = band.endIdx - band.startIdx + 1;
        if (band.direction === 1) { // Rising
            for (let i = 1; i <= len; i++) {
                bonusList.push(i);
            }
        } else if (band.direction === -1) { // Falling
            for (let i = len; i >= 1; i--) {
                bonusList.push(i);
            }
        } else if (band.direction === 0) { // Flat
            const samePay = bonusList[bonusList.length - 1];
            for (let i = 1; i <= len; i++) {
                bonusList.push(samePay);
            }
        }
    })

    return bonusList;
}

/**
 * Assertions
 */
console.log(getBands([60, 10, 40, 200, 1000, 60, 30]).length === 3);
console.log(bonuses([10, 40, 200, 1000, 60, 30]).join(',') === '1,2,3,4,2,1');
