/**
 * River crossing
 */
enum Cargo { Farmer = 'Farmer', Goat = 'Goat', Goose = 'Goose', Grain = 'Grain' }

enum Side { Left, Right }

const ILLEGAL = { 
    [[Cargo.Goat, Cargo.Goose].sort().join(',')]: true,
    [[Cargo.Goose, Cargo.Grain].sort().join(',')]: true
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
    newState.location[newSide] = newState.location[newSide].concat(...passengers); // add
    newState.location[state.boatSide] = newState.location[state.boatSide].filter(x => !passengers.includes(x)); // subtract
    return newState;
}

const search = (state: State, maxDepth: number = 5) => {

}

/**
 * TESTS
 */
console.log(
    pretty(
        crossRiver(crossRiver(START_STATE, [Cargo.Farmer, Cargo.Goose]), [Cargo.Goose]) 
    ) === 'Goat,Grain,Goose___Farmer' ? 'Passed' : 'Failed');

console.log(ILLEGAL['Goose,Grain'] ? 'Passed': 'Failed');
