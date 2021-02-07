/**
 *                   #143 [Medium] - PARTITION ON PIVOT
 *
 * This problem was asked by Amazon.
 *
 * Given a pivot x, and a list lst, partition the list into three parts.
 * - The first part contains all elements in lst that are less than x
 * - The second part contains all elements in lst that are equal to x
 * - The third part contains all elements in lst that are larger than x
 * Ordering within a part can be arbitrary.
 * For example, given x = 10 and lst = [9, 12, 3, 5, 14, 10, 10], 
 * one partition may be [9, 3, 5, 10, 10, 12, 14].
 */

const partition = (lst: number[], pivot: number): number[] => {
    const smaller: number[] = [];
    const same: number[] = [];
    const larger: number[] = [];

    lst.forEach(elem => {
        if (elem < pivot) {
            smaller.push(elem);
        } else if (elem === pivot) {
            same.push(elem);
        } else {
            larger.push(elem);
        }
    })
    return smaller.concat(same).concat(larger);
}

/**
 * Assertions
 */
console.log(partition([9, 12, 3, 5, 14, 10, 10], 10).join(' ') === '9 3 5 10 10 12 14');
console.log(partition([9, 12, 3, 5, 14, 10, 10], 3).join(' ') === '3 9 12 5 14 10 10');
console.log(partition([9, 12, 3, 5, 14, 10, 10], 11).join(' ') === '9 3 5 10 10 12 14');
console.log(partition([9, 12], 3).join(' ') === '9 12');
console.log(partition([9, 12], 23).join(' ') === '9 12');
console.log(partition([], 23).join(' ') === '');
