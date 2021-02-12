/**
 *                      #149 [Hard] - OPTIMIZED SUM
 * 
 * This problem was asked by Goldman Sachs.
 *
 * Given a list of numbers L, implement a method sum(i, j) which returns
 * the sum from the sublist L[i:j] (including i, excluding j).
 * For example, given L = [1, 2, 3, 4, 5], sum(1, 3) should return sum([2, 3]), which is 5.
 * You can assume that you can do some pre-processing. sum() should be optimized over the 
 * pre-processing step.
 * 
 * SOLUTION
 * Preprocess a running total.
 */

class FastNumList {
    /**
     * 1 2 3 -> Running Total: 0 1 3 6
     */
    runningTotal: number[] = [];

    constructor(list: number[]) {
        let total = 0;
        this.runningTotal.push(0); // dummy to make sum() simpler
        list.forEach(elem => {
            total += elem;
            this.runningTotal.push(total);
        });
        console.log('list, rt', list, this.runningTotal);
    }

    sum(i: number, j: number ): number {
        return this.runningTotal[j] - this.runningTotal[i];
    }
}

/**
 * ASSERTIONS
 */
console.log(new FastNumList([1, 2, 3, 4, 5]).sum(1, 3) === 5);
