package main

import (
	"fmt"
	"sort"
	"strings"
)

/**
 * Creates a reverse dictionary of dict
 */
func makeReverseIndex(dict []string) map[string]int {
	m := make(map[string]int)
	for _, word := range dict {
		m[sortWord(word)] = 1
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
	m := makeReverseIndex(dict)
	fmt.Print(m)

}

func main() {

	longestWord([]string{"go", "to"})

}
