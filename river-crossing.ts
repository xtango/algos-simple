/**
 * River Crossing Puzzle
 * 
 * From https://en.wikipedia.org/wiki/Wolf,_goat_and_cabbage_problem
 * 
 * "Once upon a time a farmer went to a market and purchased a wolf, a goat, and a cabbage.
 * On his way home, the farmer came to the bank of a river and rented a boat.
 * But crossing the river by boat, the farmer could carry only himself and a single one
 * of his purchases: the wolf, the goat, or the cabbage.
 * If left unattended together, the wolf would eat the goat, or the goat would eat the cabbage.
 * The farmer's challenge was to carry himself and his purchases to the far bank of the river,
 * leaving each purchase intact. How did he do it?"
 */
enum Cargo { Farmer = 'F', Wolf = 'W', Goat = 'G', Cabbage = 'C' }

enum Bank { Left, Right }

const makeStateKey = (state: State) => `${state.location[Bank.Left].sort().join('')}_${state.location[Bank.Right].sort().join('')}`;

/**
 * Disallowed states object for constant time lookup.
 */
const UNSAFE_STATES: { [key: string]: boolean } = {
  [makeStateKey({ location: [[Cargo.Wolf, Cargo.Goat], [Cargo.Farmer, Cargo.Cabbage]], boat: Bank.Right })]: true,
  [makeStateKey({ location: [[Cargo.Farmer, Cargo.Cabbage], [Cargo.Wolf, Cargo.Goat]], boat: Bank.Left })]: true,

  [makeStateKey({ location: [[Cargo.Wolf, Cargo.Goat, Cargo.Cabbage], [Cargo.Farmer]], boat: Bank.Right })]: true,
  [makeStateKey({ location: [[Cargo.Farmer], [Cargo.Wolf, Cargo.Goat, Cargo.Cabbage]], boat: Bank.Right })]: true,

  [makeStateKey({ location: [[Cargo.Goat, Cargo.Cabbage], [Cargo.Farmer, Cargo.Wolf]], boat: Bank.Right })]: true,
  [makeStateKey({ location: [[Cargo.Farmer, Cargo.Wolf], [Cargo.Goat, Cargo.Cabbage]], boat: Bank.Right })]: true,
};


interface State {
  location: Cargo[][]; // Who is where, by side
  boat: Bank; // Which side is the boat (& the farmer)
  path?: string; // The path as a string to this state
}

type Visited = { [key: string]: boolean };

const START_STATE: State = {
  location: [/* left */[Cargo.Farmer, Cargo.Wolf, Cargo.Goat, Cargo.Cabbage], /* right */[]],
  boat: Bank.Left,
  path: ''
}

const pretty = (state: State) => makeStateKey(state);

const otherSide = (side: Bank) => side === Bank.Left ? Bank.Right : Bank.Left;

const cloneState = (state: State) => {
  const newState = { ...state };
  newState.location = state.location.map(x => [...x]); // deepCopy
  return newState;
}

const isUnsafe = (state: State): boolean => UNSAFE_STATES[makeStateKey(state)];

/**
 * Moves and returns the new state
 */
const crossRiver = (state: State, cargoList: Cargo[]): State => {
  const newSide = otherSide(state.boat);
  const newState = cloneState(state);
  newState.boat = newSide;
  newState.location[newSide] = newState.location[newSide].concat(...cargoList).sort(); // add
  newState.location[state.boat] = newState.location[state.boat].filter(x => !cargoList.includes(x)).sort(); // subtract
  return newState;
}

const hasVisited = (state: State, visited: Visited) => visited[makeStateKey(state)] !== undefined;

/**
 * Reducer to get the next valid states that have not been already visited.
 * Valid states are those that would leave those not in the boat (left behind) in a safe state.
 * 
 * @param state The current state
 * @param visited Hash map of states already visited states
 */
const nextStates = (state: State, visited: Visited): State[] => {
  return state
    .location[state.boat] // -> the cargo on a particular bank
    .map(x => crossRiver(state, x === Cargo.Farmer ? [x] : [Cargo.Farmer, x])) // All states after crossing with farmer
    .filter(s => !isUnsafe(s) && !hasVisited(s, visited))
}

const stateIsTarget = (state: State) => state.location[Bank.Left].length === 0

/**
 * In-place update of visited
 */
const visit = (state: State, visited: Visited) => {
  visited[makeStateKey(state)] = true;
  console.log(`[CROSS]....New State: ${pretty(state)}`);
}
/**
 * DFS search of paths to move everyone to the right bank of the river.
 */
const search = (initState: State, maxDepth: number) => {

  // Helper function for recursive calls
  const searchHelper = (
    state: State,
    depth: number,
    visited: Visited = {},
    path: string): boolean => {

  // Defensive code
    if (depth > maxDepth) return false;
    if (stateIsTarget(state)) {
      console.log(`[INITIAL STATE IS TARGET]`);
      return true;
    }

    visit(state, visited);

    const branches = nextStates(state, visited);
    console.log(`[SEARCH].......Depth: ${depth}`);
    console.log(`[QUEUE]..Next States: ${branches.map(x => pretty(x)).join(', ')}`);

    let found = false;
    let i = 0;
    while(i < branches.length && !found) {
      // Moved everything to the right?
      if (stateIsTarget(branches[i])) {
        console.log(`[FOUND] ${path} ! Final: ${pretty(branches[i])}`);
        found = true;
      } else {
        // Recurse
        found = searchHelper(branches[i], depth + 1, visited, `${path}->${pretty(branches[i])}`);
      }
      i++;
    }

    return found;
  }

  searchHelper(initState, 0, { [makeStateKey(initState)]: true }, pretty(initState));
}

/**
 * TESTS
 */
console.log('[TEST] Illegal lookup', UNSAFE_STATES['CGW_F'] ? 'Passed' : 'Failed');

const afterCrossings = crossRiver(
  crossRiver(START_STATE, [Cargo.Farmer, Cargo.Goat]),
  [Cargo.Farmer]);

console.log('[TEST] crossing',
  pretty(afterCrossings)
    === 'CFW_G'
    ? 'Passed'
    : 'Failed');
    
search(START_STATE, 10); // Set MAX_DEPTH to avoid infinite recursion  
