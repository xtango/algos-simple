/**
 * #189
 */
const longestDistinctSubArray = (arr: number[]): number => {
    let [i, longest] = [0, 0];
    while (i < arr.length) {
        let j = i;
        let dict = new Set();
        while (j < arr.length && !dict.has(arr[j])) {
            dict.add(arr[j]);
            j++;
        }
        console.log('dict', dict);
        longest = Math.max(longest, dict.size)
        i++;
    }
    return longest;
}
console.log(longestDistinctSubArray([5, 1, 5, 4]));
