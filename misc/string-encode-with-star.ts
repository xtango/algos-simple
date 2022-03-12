/**
 * Encodes a string with the '*' char to indicate that all characters to the 
 * left of the '*' are repeated. See tests below for examples.
 */
function starEncode(s: string): string {
    let i = 1;
    let out = s && s.length > 0 ? s[0] : '';

    while (s && i < s.length) {
        const left = s.substr(0, i);
        const right = s.substr(i, i);
        if (left === right) {
            out += '*';
            console.log(i, left, right, out);
            i += i; // left or right's length
        } else {
            out += s[i];
            console.log(i, left, right, out);
            i++;
        }
    }
    return out;
}

/**
 * Tests
 */
console.log(starEncode(undefined) === '' ? 'pass' : 'fail');
console.log(starEncode('') === '' ? 'pass' : 'fail');
console.log(starEncode('a') === 'a' ? 'pass' : 'fail');
console.log(starEncode('ababxababx6') === 'ab*x*6' ? 'pass' : 'fail');
console.log(starEncode('a3=ldkfkek') === 'a3=ldkfkek' ? 'pass' : 'fail');
