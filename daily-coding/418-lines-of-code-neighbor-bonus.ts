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

interface Band { direction: number, startIdx: number, endIdx: number};
/**
 * Breaks up the series into rising and falling segments.
 * Returns the start and end indices of each band
 */
const getBands = (linesOfCode: number[]): Band []  => {
    const bands: Band[] = []// list of start, end
    let direction = linesOfCode[1] > linesOfCode[0]
        ? 1 // rising
        : linesOfCode[1] < linesOfCode[0] ? -1 //  falling
            : 0;
    let startIdx = 0;
    for (let i = 1; i < linesOfCode.length; i++) {
        const [prev, curr] = [linesOfCode[i-1], linesOfCode[i]];
        if (curr > prev && direction === -1) {
            // Turning point from falling to rising
            bands.push({direction, startIdx, endIdx: i-1});
            startIdx = i;
            direction = 1;
        } else if (curr < linesOfCode[i - 1] && direction === 1) {
            // Turning point from rising to falling
            bands.push({direction, startIdx, endIdx: i-1});
            startIdx = i;
            direction = -1;
        }
    }
    // Last band
    bands.push({direction, startIdx, endIdx: linesOfCode.length -1})
    return bands;
}

/**
 * Approach
 *              |
 *         |    |
 *     |   |    |    |
 *  |  |   |    |    |    |
 * 10  40 200 1000  60   30
 * 
 * |--rising----|-falling-|
 * For the rising band we start incrementing by 1 starting from $1.
 * For the falling band we start decrement by 1 starting from $x where x is the lengtgh of the falling band.
 */
const bonuses = (linesOfCode: number[]): number[] => {
    console.log('loc', linesOfCode);
    const payList: number[] = [];
    const bands = getBands(linesOfCode);
    bands.forEach(band => {
        const len = band.endIdx - band.startIdx + 1;
        if (band.direction === 1) {
            for (let i = 1; i <= len; i++) {
                payList.push(i);
            }
        } else if (band.direction === -1) { // Falling
            for (let i = len; i > 0; i--) {
                payList.push(i);
            }
        } else if (band.direction === 0) { // Same as neighbor
            const samePay = payList[payList.length -1];
            for (let i = 1; i <= len; i++) {
                payList.push(samePay);
            }
        }
    })
        
    return payList;
}

/**
 * Assertions
 */
console.log(getBands([60, 10, 40, 200, 1000, 60, 30]).length === 3);
console.log(bonuses([10, 40, 200, 1000, 60, 30]).join(',') === '1,2,3,4,2,1')
