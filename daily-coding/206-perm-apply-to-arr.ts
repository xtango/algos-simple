/**
 *                   #206 [Easy] - Permutation Applied to Array
 * 
 * This problem was asked by Twitter.
 * 
 * A permutation can be specified by an array P, where P[i] represents the location 
 * of the element at i in the permutation. For example, [2, 1, 0] represents the 
 * permutation where elements at the index 0 and 2 are swapped.
 * Given an array and a permutation, apply the permutation to the array.
 * 
 * For example, given the array ["a", "b", "c"] and the permutation [2, 1, 0],
 * return ["c", "b", "a"].
 */

/**
 * Trivial solution returning a new array (the problem statement does not specify in-place / 
 * memory limitations).
 */
const applyPermToArray = (arr: string[], perms: number[]) => perms.map(x => arr[x]);

/**
 * ASSERTIONS
 */
console.log(applyPermToArray(['a', 'b', 'c'], [2, 1, 0]).join(' ') === 'c b a')
console.log(applyPermToArray(['a', 'b', 'c', 'd'], [2, 1, 0, 3]).join(' ') === 'c b a d');
