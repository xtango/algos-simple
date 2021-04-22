/**
 *                  #157 [Easy] PERMUTATION IS PALINDROME
 *
 * This problem was asked by Amazon.
 * 
 * Given a string, determine whether any permutation of it is a palindrome.
 * For example, carrace should return true, since it can be rearranged to
 * form racecar, which is a palindrome. daily should return false, since
 * there's no rearrangement that can form a palindrome.
 */

/**
 * Recursive generation of permuations of arr using Heap's algo
 * @see https://en.wikipedia.org/wiki/Heap%27s_algorithm
 * @example heapsPermute(['a', 'b', 'c']) returns
 *          [["a", "b", "c"],
 *           ["b", "a", "c"],
 *           ["c", "a", "b"],
 *           ["a", "c", "b"],
 *           ["b", "c", "a"],
 *           ["c", "b", "a"]] 
 */
const heapsPermute = (
    arr: string[],
    permsAccum: string[][] = [],
    k: number = arr.length
): string[][] => {
    if (k === 1) {
        permsAccum.push([...arr]); // Push copy of arr
    }

    for (let i = 0; i < k; i++) {
        // Recurse
        heapsPermute(arr, permsAccum, k - 1);
        // Swap choice dependent on parity of k (even or odd)
        k % 2
            // Odd
            ? [arr[0], arr[k - 1]] = [arr[k - 1], arr[0]]
            // Even
            : [arr[i], arr[k - 1]] = [arr[k - 1], arr[i]]
    }
    return permsAccum
}

const stringReverse = (str: string): string => str.split('').reverse().join("");

const stringPerm = (str: string): string[] => heapsPermute(str.split('')).map(x => x.join(''));

const isPalindrome = (str: string): boolean => str === stringReverse(str)

const canRearrange = (str: string): boolean => stringPerm(str).find(perm => isPalindrome(perm)) !== undefined

/**
 * ASSERTIONS
 */
console.log(stringPerm('abc').sort().join(' ') === 'abc acb bac bca cab cba');
console.log(stringPerm('').join(' ') === '');
console.log(stringReverse('ab') === 'ba');
console.log(canRearrange('cac') === true);
console.log(canRearrange('carrace') === true);
console.log(canRearrange('daily') === false);
console.log(canRearrange('abc') === false);
