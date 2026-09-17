// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 alibaba/open-code-review Contributors

package viewer

import (
	"net/http/httptest"
	"strings"
	"testing"
)

func TestKoreanViewerMarkup(t *testing.T) {
	rr := httptest.NewRecorder()
	handleRepos(rr, httptest.NewRequest("GET", "/", nil), t.TempDir())
	body := rr.Body.String()
	for _, want := range []string{`<html lang="ko">`, viewerText("Repositories"), viewerText("No session data found. Run a code review first."), "korean llm model kbs"} {
		if !strings.Contains(body, want) {
			t.Errorf("missing localized markup %q", want)
		}
	}
	if viewerText("unknown-key") != "unknown-key" {
		t.Fatal("unknown keys should retain technical labels")
	}
}
