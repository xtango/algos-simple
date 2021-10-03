/**
 *                  Problem #379 [Easy] - SUBSEQUENCES
 * 
 * This problem was asked by Microsoft.
 * 
 * Given a string, generate all possible subsequences of the string.
 * For example, given the string xyz, return an array or set with the following strings:
 * x
 * y
 * z
 * xy
 * xz
 * yz
 * xyz
 * 
 * Note that zx is not a valid subsequence since it is not in the order of the given string.
 */

const subsequences = (input: string): string[] => {
    let output: string[] = [];

    const recurHelper = (left: string, right: string): void => {
        // Base case
        if (left.length === 0) {
            if (right.length > 0) { // Do not output ''
                output.push(right);
            }
            return;
        }

        // Recurse, including 1st char in right
        recurHelper(left.substr(1), right + left[0]);

        // Recurse, excluding 1st char in right
        recurHelper(left.substr(1), right);
    }

    recurHelper(input, '');
    return output;
}

/**
 * ASSERTIONS
 */
console.log(subsequences('xyz').sort().join(',') === 'x,xy,xyz,xz,y,yz,z');
