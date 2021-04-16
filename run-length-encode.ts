/**
 * Run length encodes str.
 * @example aabbbbaa -> a2b4a2
 */
const runLengthEncode = (str: string) => {
    let [j, out] = [0, str[0]];
    for (let i = 1; i < str.length; i++) {
        if (str[i] !== str[i - 1]) {
            out += (i - j) + str[i];
            j = i;
        }
    }
    // Last char
    out += str.length - j;
    return out;
}
                                   
/**
 * ASSERTIONS
 */
console.log(runLengthEncode('a') === 'a1');
console.log(runLengthEncode('aabb') === 'a2b2');
console.log(runLengthEncode('aabbbbaa') === 'a2b4a2');
