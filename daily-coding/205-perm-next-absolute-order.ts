/**
 *                   #205 [Easy] - NEX PERMUTATION IN ABSOLUTE ORDER
 *
 * Good morning! Here's your coding interview problem for today.
 * 
 * This problem was asked by IBM.
 * Given an integer, find the next permutation of it in absolute order.
 * For example, given 48975, the next permutation would be 49578.
 */

/**
 * From right to left we find the digit that's not descending-sorted. This 
 * is the index of the candidate digit to replace making the num larger.
 * 
 * @example findTailIndex(4321) -> 0 as there's no larger perm
 * @example findTailIndex(4312) -> 3 as the number 2 is a replacement candidate. Replacing 2 with 1 gives 4321
 */
const findStartIndex = (numStr: string): number => {
    let i = numStr.length - 1;
    while (i > 0 && numStr[i - 1] > numStr[i]) {
        i--;
    }
    return i;
}

const nextLargerPerm = (num: number): number => {
    const numStr = num.toString();
    const startIdx = findStartIndex(numStr);
    if (startIdx === 0) {
        return num;
    }

    // @example '43120'
    //          findStartIndex('43120')                      -> 3
    //          head, tail:                                  -> '1', '20'
    //          Replace head w/ smallest digit > '1', 2      -> '2' + ...
    //          Next place '1' to right of smallest digit, 0 -> '201'
    //          '43' concat '201'                            -> '43201'
    if (startIdx > 0) {
        const [head, tail] = [numStr[startIdx - 1], numStr.substring(startIdx)];
        let [i, min, minIdx, minGTHead, minGTHeadIdx] = [0, tail[0], 0, tail[0], 0];
        while (i < tail.length) {
            if (tail[i] > head && tail[i] < minGTHead) {
                minGTHead = tail[i];
                minGTHeadIdx = i;
            }
            if (tail[i] < min) {
                min = tail[i];
                minIdx = i;
            }
            i++;
        }
        const nextPerm = numStr.substring(0, startIdx - 1) + tail[minGTHeadIdx] + tail.substring(minIdx) + head;
        console.log({ num, head, tail, minGTHead, minGTHeadIdx, nextPerm });
        return parseInt(nextPerm);
    }
    return num;
}

/**
 * ASSERTIONS
 */
console.log(findStartIndex('4321') === 0);
console.log(findStartIndex('4312') === 3);
console.log(nextLargerPerm(43120) === 43201);
