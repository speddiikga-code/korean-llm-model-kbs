// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 alibaba/open-code-review Contributors

package viewer

import "encoding/json"

// The Korean copy table is embedded, so the local viewer needs no network.
var koreanCopy = func() map[string]string {
	data, err := assets.ReadFile("i18n/ko.json")
	if err != nil {
		panic(err)
	}
	var table map[string]string
	if err := json.Unmarshal(data, &table); err != nil {
		panic(err)
	}
	return table
}()

func viewerText(key string) string {
	if text, ok := koreanCopy[key]; ok {
		return text
	}
	return key
}
