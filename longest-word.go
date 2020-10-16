package main

import (
	"fmt"
	"sort"
	"strings"
)

/**
  * Creates a { key -> [dictionaryWord]} object, where key is the sorted letters entry.
   * E.g. invertDict(['dog', 'god'] ) returns
   *      { dgo: [ 'god', 'dog']}
*/
func makeInvertedDict(dict []string) map[string][]string {
	m := make(map[string][]string
	for _, word := range dict {
		sorted := sortWord(word)
		val, found := m[sorted]
		if found {
			fmt.Printf("found: %s %s", sorted, val)
		} else {
			m[sorted] = []string{word}
		}
	}
	return m
}

func sortWord(w string) string {
	s := strings.Split(w, "")
	sort.Strings(s)
	return strings.Join(s, "")
}

func longestWord(dict []string) {
	fmt.Printf("[longestWord] dict: %s\n", strings.Join(dict, ", "))
	m := makeInvertedDict(dict)
	fmt.Print(m)

}

func main() {

	longestWord([]string{"go", "to", "god", "dog"})

}
