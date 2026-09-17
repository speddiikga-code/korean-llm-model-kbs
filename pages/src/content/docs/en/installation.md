---
title: Installation
sidebar:
  order: 4
---

This Korean edition is currently distributed as **source code**. No independent npm package, Homebrew package, or release binary is published yet. Upstream packages install the original project, not this fork.

## Requirements {#requirements}

- Git 2.41 or later
- Go 1.25.5 or later
- Network access to download build dependencies

## Clone {#clone}

```bash
git clone https://github.com/speddiikga-code/korean-llm-model-kbs.git
cd korean-llm-model-kbs
```

## Windows {#windows}

```powershell
go build -o ocr.exe ./cmd/opencodereview
.\ocr.exe version
.\ocr.exe config provider
.\ocr.exe config set language Korean
.\ocr.exe llm test
.\ocr.exe review --repo C:/path/to/your-repo --preview
```

To run `ocr` from another directory, put `ocr.exe` in a directory on your user PATH.

## macOS / Linux {#macos-linux}

```bash
go build -o ocr ./cmd/opencodereview
./ocr version
./ocr config provider
./ocr config set language Korean
./ocr llm test
./ocr review --repo /path/to/your-repo --preview
```

Optionally copy the binary into a directory on your PATH:

```bash
mkdir -p "$HOME/.local/bin"
cp ocr "$HOME/.local/bin/ocr"
```

Ensure `$HOME/.local/bin` is in your PATH before using the bare `ocr` command.

## Update {#update}

Commit or save any local source changes, run `git pull --ff-only`, then repeat the build command for your platform. Source builds do not use the upstream npm auto-updater.

## Configuration {#configuration}

The fork shares `~/.opencodereview/config.json` and the session directory with an existing OCR installation. Select Korean explicitly with `ocr config set language Korean` if an older configuration selects another language. Keep API keys out of version control.

Continue with [Quick Start](../quickstart/) or [Configuration](../configuration/).
