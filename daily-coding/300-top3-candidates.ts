/**
 *                  Problem #300 [Easy] TOP 3 VOTING CANDIDATES
 * 
 * This problem was asked by Uber.
 * 
 * On election day, a voting machine writes data in the form (voter_id, candidate_id) 
 * to a text file. Write a program that reads this file as a stream and returns the top 3 
 * candidates at any given time. If you find a voter voting more than once, report this as fraud.
 */
const top3 = (file: number[][]) => {
    const voters = new Set();
    const freq: { [candidateId: number]: number } = {};
    let top3: { candidateId: number, votes: number }[] = [];

    file.forEach(row => {
        const [voterId, candidateId] = [row[0], row[1]];
        if (voters.has(voterId)) {
            throw ('Fraud');
        } else {
            voters.add(voterId);

            if (freq[candidateId] === undefined) {
                freq[candidateId] = 0;
            }
            freq[candidateId]++;

            // Update the leading candidates array
            const top3Idx = top3.findIndex(x=> x.candidateId === candidateId);
            if (top3Idx > -1) {
                top3.splice(top3Idx, 1); // Remove
            }

            // Top 3
            top3.push({candidateId, votes: freq[candidateId]});
            top3.sort((a, b) => a.votes > b.votes ? -1 : 1); // descending
            top3 = top3.slice(0, 3)
        }
    });

    return top3;
}

/**
 * ASSERTIONS
 */
const MOCK_FILE = [
    // voter_id, candidate_id
    [1, 1],
    [3, 2],
    [2, 1],
    [4, 3],
    [9, 2],
    [5, 1]];

console.log(top3(MOCK_FILE).map(x => x.candidateId).join(',') === '1,2,3');
