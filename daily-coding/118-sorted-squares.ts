/**
 *                  #118 [Easy] - SORTED SQUARES
 * 
 * This problem was asked by Google.
 * Given a sorted list of integers, square the elements and give the output in sorted order.
 * For example, given [-9, -2, 0, 2, 3], return [0, 4, 4, 9, 81].
 * 
 * SOLUTION
 * Create 2 list, one for negatives val squares and the other for postive val squares. 
 * Then merge the 2 sorted lists.
 */

/**
 * Returns 2 arrays of squares of input: 
 *      first:  input[i] ^2 for input[i] negative
 *      second: input[i] ^2 for input[i] positive
 */
const squares = (input: number[]): number[][] => {
    const [negArr, posArr]: number[][] = [[], []];
    for (let i = 0; i < input.length; i++) {
        const val = input[i];
        const arr = val >= 0 ? posArr : negArr;
        arr.push(val * val);
    }
    return [negArr, posArr];
}

/**
 * Merges 2 arrays where descArr is sorted in descending order 
 * and posArr is sorted in ascending order.
 */
const mergeSortedArrays = (descArr: number[], ascArr: number[]): number[] => {
    const out = [];
    let [descIdx, ascIdx] = [descArr.length - 1, 0]; // Iterate backwards through descArr
    while (descIdx >= 0 && ascIdx < ascArr.length) {
        if (descArr[descIdx] > ascArr[ascIdx]) {
            out.push(ascArr[ascIdx]);
            ascIdx++;
        } else {
            out.push(ascArr[descIdx]);
            descIdx--; // backwards
        }
    }

    // The rest: remaining descArr 
    while (descIdx >= 0) {
        out.push(descArr[descIdx]);
        descIdx--; // backwards
    }

    // The rest: remaining ascArr
    while (ascIdx < ascArr.length) {
        out.push(ascArr[ascIdx]);
        ascIdx++;
    }

    return out;
}

const sortedSquares = (input: number[]): number[] => {
    const sq = squares(input);
    return mergeSortedArrays(sq[0], sq[1]);
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(sortedSquares([-9, -2, -1])) === '[1,4,81]');
console.log(JSON.stringify(sortedSquares([-9, -2, 0, 2, 3])) === '[0,4,4,9,81]');
console.log(JSON.stringify(sortedSquares([0, 2, 4])) === '[0,4,16]');
