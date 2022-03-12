package main

import (
	"fmt"
	"sort"
	"strings"
)

/**
 * Returns a list of valid words. In the future, this can pull from a file or API.
 */
func getDict() []string {
	return []string{"go", "to", "god", "dog"}
}

type InvertedDict map[string][]string

/**
 * Creates a { key -> [dictionaryWord]} object, where key is the sorted letters entry.
 * E.g. makeInvertedDict(['dog', 'god'] ) returns
 *      { dgo: [ 'god', 'dog']}
 */
func makeInvertedDict(dict []string) InvertedDict {
	m := make(map[string][]string)
	for _, word := range dict {
		sorted := sortWord(word)
		val, found := m[sorted]
		if found {
			m[sorted] = append(val, word)
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

/**
 * Returns combinations of the word
 */
//func combos(word string) []string {
//
//}

func longestWord(invertedDict, hand string) {

}

func main() {
	dict := getDict()
	inverted := makeInvertedDict(dict)
	fmt.Printf("LONGEST DICTIONARY WORD\n")
	fmt.Printf("Dictionary: %s\n", strings.Join(dict, " "))
	fmt.Printf("  Inverted: %s", inverted)
}
