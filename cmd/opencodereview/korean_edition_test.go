// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 alibaba/open-code-review Contributors

package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestKoreanEditionConfigDefaultAndOverride(t *testing.T) {
	path := filepath.Join(t.TempDir(), "config.json")
	cfg, err := loadOrCreateConfig(path)
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Language != "Korean" {
		t.Fatalf("default language = %q", cfg.Language)
	}
	if err := setConfigValue(cfg, "language", "English"); err != nil {
		t.Fatal(err)
	}
	if err := saveConfig(path, cfg); err != nil {
		t.Fatal(err)
	}
	loaded, err := loadOrCreateConfig(path)
	if err != nil {
		t.Fatal(err)
	}
	if loaded.Language != "English" {
		t.Fatalf("explicit language = %q", loaded.Language)
	}
}

func TestKoreanEditionDelegateOutputLanguage(t *testing.T) {
	for _, language := range []string{"", "English"} {
		t.Run("configured_"+language, func(t *testing.T) {
			freshOCRHome(t)
			repo := initTestGitRepo(t)
			want := "Korean"
			if language != "" {
				configPath, err := defaultConfigPath()
				if err != nil {
					t.Fatal(err)
				}
				if err := saveConfig(configPath, &Config{Language: language}); err != nil {
					t.Fatal(err)
				}
				want = language
			}
			if err := os.WriteFile(filepath.Join(repo, "app.go"), []byte("package app\n"), 0o644); err != nil {
				t.Fatal(err)
			}
			out := captureDelegateStdout(t, func() {
				if err := executeDelegatePreview(delegateOptions{repoDir: repo, format: "json"}); err != nil {
					t.Fatal(err)
				}
			})
			var preview delegatePreviewJSON
			if err := json.Unmarshal(out, &preview); err != nil {
				t.Fatal(err)
			}
			if preview.Language != want {
				t.Fatalf("preview language = %q, want %q", preview.Language, want)
			}
			out = captureDelegateStdout(t, func() {
				if err := executeDelegateRule(delegateOptions{repoDir: repo, format: "text"}, []string{"app.go"}); err != nil {
					t.Fatal(err)
				}
			})
			if !strings.Contains(string(out), "Always respond in "+want+".") {
				t.Fatalf("missing language directive: %s", out)
			}
		})
	}
}
