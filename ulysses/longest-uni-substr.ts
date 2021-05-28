/**
 *              Longest uniform substring
 */
/**
 * Returns the start index and len of the longest uniform string in str.
 * @example "xaaaabbc" returns [1, 4] 
 *            |  |
 *            j  i 
 */
const longest = (str: string) => {
    let [j, i] = [0, 1];
    let [maxStart, maxLen] = [0, 1];
    while (i < str.length) {
        const isLastChar = (i === str.length - 1);
        if ((str[i - 1] !== str[i]) || isLastChar) {
            const len = isLastChar ? i - j + 1 : i - j;
            if (len > maxLen) {
                [maxStart, maxLen] = [j, len];
                //console.log('max, start', maxStart, maxLen);
            }
            j = i;
        }
        i++;
    }
    return [maxStart, maxLen];
}

/**
 * ASSERTIONS
 */
console.log(longest('xaaaabbc').join(',') === '1,4')
console.log(longest('bbxxxxxx').join(',') === '2,6')
