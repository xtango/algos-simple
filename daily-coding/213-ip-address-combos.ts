/**
 *                           #213 [Medium] - IP ADDRESS COMBINATIONS
 * 
 * This problem was asked by Snapchat.
 * 
 * Given a string of digits, generate all possible valid IP address combinations.
 * IP addresses must follow the format A.B.C.D, where A, B, C, and D are numbers between 0 and 255.
 * Zero-prefixed numbers, such as 01 and 065, are not allowed, except for 0 itself.
 * For example, given "2542540123", you should return ['254.25.40.123', '254.254.0.123'].
 */

/**
 * Cannot start with 0
 */
const twoDigitValid = (str: string): boolean => {
    if (!str?.length) {
        return false;
    }
    const num = parseInt(str);
    return 9 < num && num < 100
}

const threeDigitValid = (str: string): boolean => {
    if (!str?.length) {
        return false;
    }
    const num = parseInt(str);
    return 100 <= num && num <= 255
}

/**
 * Finds combinations using depth-first recursion.
 * 
 * @example
 *              10187190172
 *       
 *       .2                .72              .172
 * 
 *  .7.2   .17.2        .1.72  .901.72        etc
 */
const ipCombos = (str: string): string[] => {
    const addresses: Set<string> = new Set();

    /**
     * Recursive func. 
     * Side effect: adds to the addresses set.
     */
    const dfs = (str: string, combos: string[] = [], depth: number = 0): string[] => {
        //console.log(`[Depth: ${depth}]`, str, combos);
        if (str === '' && combos.length === 4) {
            addresses.add(combos.join('.'));
            return combos;
        }

        if (combos.length > 4) { // Cannot split into > 4 groups
            return [];
        }

        const len = str.length;
        const [oneDigit, twoDigit, threeDigit] = [
            str.substring(len - 1),
            len > 1 ? str.substring(len - 2) : '',
            len > 2 ? str.substring(len - 3) : ''];

        // Depth first recursive calls
        const ips1 = dfs(str.substring(0, len - 1), [oneDigit].concat(combos), depth + 1);
        const ips2 = twoDigitValid(twoDigit)
            ? dfs(str.substring(0, len - 2), [twoDigit].concat(combos), depth + 1)
            : [];
        const ips3 = threeDigitValid(threeDigit)
            ? dfs(str.substring(0, len - 3), [threeDigit].concat(combos), depth + 1)
            : [];
        return ips3.concat(ips2, ips1);
    }

    dfs(str);
    return Array.from(addresses);
}

/**
 * ASSERTIONS
 */
console.log(ipCombos('10187190172').sort().join(', ') === '10.187.190.172, 101.87.190.172');
console.log(ipCombos('2542540123').sort().join(', ') === '254.25.40.123, 254.254.0.123');
