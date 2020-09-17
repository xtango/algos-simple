/**
 * Recursive function to find sets in arr that sum up to the target number target.
 * 
 * @example sumsTo([2, 4, 6], 6)) 
 *  ->  [[2, 4], [6]] // since the elements of each set add up to 6.
 */
const sumsTo = (arr: number[], target: number) => {
    console.log(`sumsTo: arr: [${arr}], target: ${target}`);
    let ret;
    if (arr.length <= 0) {
        ret = [];
    } else {
        const last = arr[arr.length - 1];
        if (last === target) {
            // 2 lists. itself and the rest
            const rest = sumsTo(withoutLast(arr), target);
            ret = rest ? [last, rest] : last;
        } else if (last > target) {
            // exclude last
            ret = sumsTo(withoutLast(arr), target);
        } else if (last < target) {
            // include last
            const rest = sumsTo(withoutLast(arr), target - last);
            ret = rest ? [last, ...rest] : [last];
        }
    }

    console.log(`----> sumsTo: arr: [${arr}], target: ${target} -> ${ret}`);
    return compactArray(ret);
}

/**
 * Returns a clone with the last element removed.
 */
const withoutLast = (a: number[]): number[] => {
    const clone = [...a];
    clone.pop();
    return clone;
}

/**
 * Filters out empty elements []
 */
const compactArray = (arr) {
    return arr.filter(elem => !(Array.isArray && elem.length === 0));
}

/**
 * TEST
 */
console.log(sumsTo([2, 4, 6].sort(), 6));
