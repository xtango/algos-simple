/**
 *                          #178 [Hard] - SIMULATE EXPECTED VALUE
 * 
 * This problem was asked by Two Sigma.
 * 
 * Alice wants to join her school's Probability Student Club. Membership dues are computed 
 * via one of two simple probabilistic games.
 * The first game: roll a die repeatedly. Stop rolling once you get a five followed by a six. 
 * Your number of rolls is the amount you pay, in dollars.
 * The second game: same, except that the stopping condition is a five followed by a five.
 * Which of the two games should Alice elect to play? Does it even matter? Write a program 
 * to simulate the two games and calculate their expected value.
 */

/**
 *  Alice can elect to play either, as they are 2 independant events.
 */

/**
 * Rand between 1 inclusive and 6 inclusive.
 */
const roll = () => Math.floor(Math.random() * 6 + 1);

/**
 * Rolls until first target is hit, and immediately following, the second target is hit.
 * Returns the number of rolls (i.e. the dollar amount).
 *
 * @param maxTries Stops searching if maxTries is reached.
 */
const pay = (targets: number[], maxTries: number) => {
    let i = 0;
    while(i < maxTries) {
        if (targets[0] === roll() && targets[1] === roll()) {
            break;
        }
        i++;
    }
    return i;
}

const simAvgPayout = (targets: number[], repititions: number = 10000) => {
    let dollars = 0;
    for (let i = 0; i < repititions; i++) {
        dollars += pay(targets, 1000000)
    }
    return dollars / repititions; // returns the avg payout
}

/**
 * ASSERTIONS
 */
const game1Avg = simAvgPayout([5, 6], 10000)
const game2Avg = simAvgPayout([6, 6], 10000);
console.log(Math.round((game1Avg - game2Avg)/game2Avg) === 0);
