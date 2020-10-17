package main

import (
	"fmt"
	"sort"
	"strings"
)

func getDict() []string {
	return []string{"go", "to", "god", "dog"}
}

/**
 * Creates a { key -> [dictionaryWord]} object, where key is the sorted letters entry.
 * E.g. makeInvertedDict(['dog', 'god'] ) returns
 *      { dgo: [ 'god', 'dog']}
 */
func makeInvertedDict(dict []string) map[string][]string {
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

//func longestWord(dict []string, hand string) {
//	m := makeInvertedDict(dict)
//}

func main() {
	dict := getDict()
	fmt.Printf("LONGEST DICTIONARY WORD\n")
	fmt.Printf("   Dictionary: %s\n", strings.Join(dict, " "))
	fmt.Printf("     Inverted: %s", makeInvertedDict(dict))
}
