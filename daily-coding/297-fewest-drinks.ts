/**
 *                          Problem #297 [Medium] - FEWEST DRINKS  *** WIP ***
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
type Remaining = { customers: number[], drinks: number[] }

const getDrinkIds = (dict: DrinkToCustDict): number[] => Object.keys(dict).map(x => Number(x));
const getCustIds = (prefs: Preferences): number[] => Object.keys(prefs).map(x => Number(x));
const minus = (a: number[], b: number[]) => a.filter(x => !b.includes(x))
const pretty = ({ customers, drinks }: Remaining): string => `REMAINING Drink: ${customers.join(',')}; Cust: ${drinks.join(',')}`

/**
 * Create boolean matrix:
 *   			Drinks
 *	 0	1	2	3	4	5	6	7	8		Count
 *	 ---------------------------------		-----
 * 0: 1	1		1			1				4
 * 1:	1			1			1			3
 * 2:		1		1	1		1			4
 * 3:		1	1		1					3
 * 4:					1			1		2
 * 
 * Pseudocode:
 * while (remaining.lengh > 0):
 *     Select largest count row // When tied, pick the first
 *     Remove row
 *     Remove columns where row values are 1s
 * 
 * After 1st iteration: (row 0 removed; cols 0, 1, 3, 6 removed)
 *	  2	 4	5	7	8		Count
 *	  -----------------		-----
 * 1:	 1		1			2
 * 2: 1	 1	1				3
 * 3: 1  	1				2
 * 4:  		1		1		2	
 * 
 * After 2nd iteration (row 2 removed; cols 2,4,5 removed)
 *	  7 8 	Count
 *	  --- 	-----
 * 1: 1     1
 * 3:     	0
 * 4: 	1 	1
 * etc.
 */
const fewest = (prefs: Preferences) => {
    const drinkDict = toDrinkDict(prefs);
    const allCusts = getCustIds(prefs);
    const allDrinks = getDrinkIds(drinkDict);
    let bestDrinks = [...allDrinks];

    const fewestHelper = (remaining: Remaining, depth: number = 0): number[] => {
        console.log('depth', depth, pretty(remaining));
        if (depth > 1) {
            console.log('Aborting, reached max depth');
            return [];
        }

        // When satisfies all customers, return the used drinks
        if (remaining.customers.length === 0) {
            console.log('--> Satisfies all')
            return minus(allDrinks, remaining.drinks);
        }

        remaining.drinks.forEach(drink => {
            const rem = {
                customers: minus(remaining.customers, drinkDict[drink]),
                drinks: minus(remaining.drinks, [drink])
            };
            const selection = fewestHelper(rem, depth + 1);
            if (selection.length < bestDrinks.length) {
                bestDrinks = selection;
            }
        })
        return bestDrinks;
    }

    fewestHelper({ customers: allCusts, drinks: allDrinks });
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
fewest(PREFS)
