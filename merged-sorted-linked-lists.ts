/**
 * MERGE SORTED LISTS
 * 
 * Given k sorted singly linked lists, write a function to merge all the lists into one sorted singly linked list.
 * 
 */

interface SLLNode { data: string, next?: SLLNode | undefined } // undefined for end of list

/**
 * Singly linked list
 */
interface SLL { head: SLLNode }

/**
 * Inserts node m after n
 */
const insertAfter = (n: SLLNode, m: SLLNode): SLLNode => {
    const tmpNext = n.next;
    n.next = m;
    m.next = tmpNext;
    return m;
}

/**
 * Merges l, m, where l and m are sorted. 
 * @return A single sorted list.
 */
const mergeSorted = () => {

}

const prettyList = (head: SLLNode): string => {
    let n: SLLNode | undefined = head;
    let s = '';
    while (n) {
        s += `${n.data}${n.next ? '->' : ''}`;
        n = n.next;
    }
    return s;
}

/**
 * ASSERTIONS
 */
const headList1 = { data: 'A' };
insertAfter(headList1, { data: 'D' });
console.log(prettyList(headList1));

const headList2 = { data: 'F' };
const list2 = insertAfter(headList2, { data: 'G' });
console.log(prettyList(headList2));
