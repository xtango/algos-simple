/**
 * River cross   ************* WORK IN PROGRESS *******************
 */
enum Cargo { Farmer = 'Farmer', Goat = 'Goat', Goose = 'Goose', Grain = 'Grain' }

enum Side { Left, Right }

const makeKey = (cargoList: Cargo[]) => cargoList.sort().join(',');

const ILLEGAL = {
    [makeKey([Cargo.Goat, Cargo.Goose])]: true,
    [makeKey([Cargo.Goat, Cargo.Goose, Cargo.Grain])]: true,
    [makeKey([Cargo.Goose, Cargo.Grain])]: true
}

interface State {
    location: Cargo[][]; // who is where, by side
    boatSide: Side; // Which side is the boat & the farmer
}

const START_STATE: State = {
    location: [/* left */[Cargo.Farmer, Cargo.Goat, Cargo.Goose, Cargo.Grain], /* right */[]],
    boatSide: Side.Left
}

const pretty = (state: State) => `${state.location[Side.Left]}___${state.location[Side.Right]}`

const otherSide = (side: Side) => side === Side.Left ? Side.Right : Side.Left;

const cloneState = (state: State) => {
    const newState = { ...state };
    newState.location = state.location.map(x => [...x]); // deepCopy
    return newState;
}

/**
 * Moves and returns the new state
 */
const crossRiver = (state: State, passengers: Cargo[]): State => {
    const newSide = otherSide(state.boatSide);
    const newState = cloneState(state);
    newState.boatSide = newSide;
    newState.location[newSide] = newState.location[newSide].concat(...passengers).sort(); // add
    newState.location[state.boatSide] = newState.location[state.boatSide].filter(x => !passengers.includes(x)).sort(); // subtract
    return newState;
}

const isLegal = (cargoList: Cargo[]): boolean => !ILLEGAL[makeKey(cargoList)];

const leftBehind = (state: State, x: Cargo) => state.location[state.boatSide].filter(y => y !== x && y !== Cargo.Farmer);

/**
 * Reducer to get passenger combos, e.g. [[Farmer], [Farmer, Goose]]
 * that would leave those not in the boat (left behind) in a legal state.
 */
const legalPassengerCombos = (state: State, leftBehindAlreadyVisited: { [key: string]: boolean }) => {
    const reducer = (accum: Cargo[][], x: Cargo) => {
        const lb = leftBehind(state, x);
        const newAccum = isLegal(lb) && !leftBehindAlreadyVisited[makeKey(lb)]
            ? [...accum, x === Cargo.Farmer ? [x] : [Cargo.Farmer, x]]
            : accum;
        // console.log(`combo: [${x}], behind: ${leftBehind}, legal?: ${isLegal(leftBehind)} -> newAcc: ${newAccum}`);
        return newAccum;
    };

    return state
        .location[state.boatSide]
        .reduce(reducer, [[]])
        .filter(x => x.length > 0);
}

const MAX_DEPTH = 4;

const search = (state: State, depth: number, visited: {[key: string]: boolean} = {}) => {
    if (depth > MAX_DEPTH) return;

    const legalCombos = legalPassengerCombos(state, visited);
    console.log(`[Depth ${depth}] Q:`, legalCombos);
    legalCombos.forEach(passengerCombo => {
        const newState = crossRiver(state, passengerCombo);
        const newVisitedKey = makeKey(newState.location[newState.boatSide]);
        visited[newVisitedKey] = true;

        console.log(`>>> Cross(${passengerCombo})`);
        console.log(`-------> State  : ${pretty(newState)}`);
        console.log(`-------> Visited: `, visited);
        search(newState, depth + 1, visited);
    });
}

/**
 * TESTS
 */
//console.log(ILLEGAL['Goose,Grain'] ? 'Passed' : 'Failed');
//const newState = crossRiver(crossRiver(START_STATE, [Cargo.Farmer, Cargo.Goose]), [Cargo.Goose]);
//console.log(pretty(newState) === 'Goat,Goose,Grain___Farmer' ? 'Passed' : 'Failed');
// console.log('LegalCombos', legalPassengerCombos(START_STATE));

search(START_STATE, 0, { [makeKey(START_STATE.location[START_STATE.boatSide])]: true});
