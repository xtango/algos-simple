/**
   *                  #202 [Easy] - INTEGER IS A PALINDROME
 * 
 * This problem was asked by Palantir.
 * 
 * Write a program that checks whether an integer is a palindrome.
 * For example, 121 is a palindrome, as well as 888. 678 is not a palindrome.
 * Do not convert the integer into a string.
 */

const reverse = (num: number): number => {
    let [x, reversedNum] = [num, 0];
    while (x > 0) {
        // Pluck last digit
        //      Iter 0: x: 123 ->  lastDigit: 3
        //      Iter 1: x: 12  ->  lastDigit: 2
        // ...
        const lastDigit = x % 10;

        reversedNum = reversedNum * 10 + lastDigit;

        // When x is more than 1 digit long, strip off the lastDigit.
        // When x is a single digit, set to 0.
        x = Math.floor(x / 10);
    }

    return reversedNum;
}

const isPalindrome = (num: number): boolean => reverse(num) === num;

/**
 * ASSERTIONS
 */
console.log(isPalindrome(121));
console.log(isPalindrome(888));
console.log(!isPalindrome(678));
