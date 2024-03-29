/**
                        Problem #331 [Medium]

This problem was asked by LinkedIn.

You are given a string consisting of the letters x and y, such as xyxxxyxyy.
In addition, you have an operation called flip, which changes a single x to y or vice versa.
Determine how many times you would need to apply this operation to ensure that all x's come before all y's.
In the preceding example, it suffices to flip the second and sixth characters, so you should return 2.
*/

/**
 * INTUITION: Take the minium of all all possible paritions into 2:
 * part(xyxxxyxyy, 1) -> x(0 flips) | yxxxyxyy(4 flips) -> x | yyyyyyyy		Flips: 4
 * part(xyxxxyxyy, 2) -> xy(1 flip) | xxxyxyy(4 flips)  -> xx | yyyyyyy 	FLips: 5
 * part(xyxxxyxyy, 3) -> xyx(1 flip) | xxyxyy(3 flips)  -> xxx | yyyyyy		Flips: 4
 * part(xyxxxyxyy, 4) -> xyxx(1 flip) | xyxyy(2 flips)  -> xxxx | yyyyy		Flips: 3
*/

const countChar = (str: string, char: string): number => {
    const matches = str.match(new RegExp(char, 'g'));
    return (matches || []).length;
}

const minFlips = (input: string): number => {
    let minFlips = input.length;
    for (let i = 1; i < input.length; i++) {
        // Partition
        const [left, right] = [input.substring(0, i), input.substring(i)];
        const flipsNeeded = countChar(left, 'y') + countChar(right, 'x');
        if (flipsNeeded < minFlips) {
            minFlips = flipsNeeded
        }
    }
    return minFlips
}

/**
 * ASSERTIONS
 */
console.log(countChar('xyxxxyxyy', 'x') === 5);
console.log(minFlips('xyxxxyxyy') === 2)
