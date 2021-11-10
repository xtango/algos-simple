/**
 *              REPEAT FROM START ENCODING
 */

/**
 *  abcabcd   ---encode--> abc*d                
 *  ---===   
 *   l  r     
 * 
 * where l and r are left and right respectively.
 */
const encode = (input: string): string => {
    let i = 1;
    let encodedStr = input[0];
    while (i < input.length) {
        const left = input.substr(0, i);
        const right = input.substr(i, left.length);
        // Hit a char that matches head, and left and right match
        if (input[i] === input[0] && left === right) {
            console.log('left, right, matches', left, right, left === right);
            encodedStr += '*';
            i = i + left.length;
        } else {
            encodedStr += input[i];
            i++;
        }
    }
    return encodedStr;
}

/**
 * ASSERTIONS
 */
console.log(encode('abcabc') === 'abc*');
console.log(encode('abcabcd') === 'abc*d');
console.log(encode('abcabcdabcabcd') === 'abc*d*');
