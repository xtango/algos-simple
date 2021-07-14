/**
 *                          Problem #297 [Medium] - FEWEST DRINKS
 * This problem was asked by Amazon.
 * 
 * At a popular bar, each customer has a set of favorite drinks, and will happily accept any
 * drink among this set. For example, in the following situation, customer 0 will be satisfied with drinks
 * 0, 1, 3, or 6.
 * 
 * preferences = {
    0: [0, 1, 3, 6],
    1: [1, 4, 7],
    2: [2, 4, 7, 5],
    3: [3, 2, 5],
    4: [5, 8]
}
A lazy bartender working at this bar is trying to reduce his effort by limiting the drink recipes he must memorize.
Given a dictionary input such as the one above, return the fewest number of drinks he must learn in order to satisfy all customers.
For the input above, the answer would be 2, as drinks 1 and 5 will satisfy everyone.
*/
type Preferences = { [custId: number]: number[] }

type DrinkToCustDict = { [drinkId: number]: number[] }

const getDrinkIds = (dict: DrinkToCustDict) => Object.keys(dict).map(x => Number(x));

const getCustIds = (prefs: Preferences) => Object.keys(prefs).map(x => Number(x));

const minus = (a: number[], b: number[]) => a.filter(x => !b.includes(x))

const fewest = (prefs: Preferences) => {
    const drinkDict = toDrinkDict(prefs);

    const fewestHelper = (remainingCustIds: number[]) => {
        console.log('remaining: ', remainingCustIds.join(','));
        if (remainingCustIds.length === 0) {
            console.log('--> Satisfies all')
        }
        getDrinkIds(drinkDict)
            .forEach(did => {
                const custIds = drinkDict[did];
                const remainder = minus(remainingCustIds, custIds)
                fewestHelper(remainder);
            })
    }

   fewestHelper(getCustIds(prefs));

}

/**
 * Maps prefs to the Drink-to-Customer dictionary.
 * @example toDrintDict(preferences) returns { 0: [0], 1: [0: 1],...8:[ 4] }
 */
const toDrinkDict = (prefs: Preferences): DrinkToCustDict => {
    const dict: DrinkToCustDict = {};
    const custIds = Object.keys(prefs).map(x => Number(x));
    custIds.forEach(custId => {
        prefs[custId].forEach(drinkId => {
            if (dict[drinkId] === undefined) {
                dict[drinkId] = [];
            }
            dict[drinkId].push(custId);
        })
    })
    return dict;
}


/**
 * ASSERTIONS
 */
const PREFS: Preferences = {
    0: [0, 1, 3, 6],
    1: [1, 4, 7],
    2: [2, 4, 7, 5],
    3: [3, 2, 5],
    4: [5, 8]
};
console.log(toDrinkDict(PREFS)[8][0] === 4);
console.log(minus([1, 2, 8, 12], [3, 8]).join(',') === '1,2,12')
