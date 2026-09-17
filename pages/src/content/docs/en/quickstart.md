---
title: Quick Start
sidebar:
  order: 3
---

**korean llm model kbs** is a Korean-first fork of Alibaba Open Code Review. It is a code-review CLI, not a newly trained LLM or a hosted chat service. This website provides documentation.

## Requirements {#prerequisites}

Install **Git 2.41+** and **Go 1.25.5+**. Reviews require access to a model API or a compatible host agent. Code and review context are sent to the model endpoint you select; provider fees may apply.

## Build the Korean edition {#install}

```bash
git clone https://github.com/speddiikga-code/korean-llm-model-kbs.git
cd korean-llm-model-kbs
```

Windows PowerShell:

```powershell
go build -o ocr.exe ./cmd/opencodereview
.\ocr.exe version
```

macOS / Linux:

```bash
go build -o ocr ./cmd/opencodereview
./ocr version
```

For the examples below, replace `ocr` with `.\ocr.exe` on Windows or `./ocr` on macOS/Linux unless you have added the binary to PATH. See [Installation](../installation/).

## Connect your model {#configure}

```bash
ocr config provider
ocr config set language Korean
ocr llm test
```

Enter your API key in your local terminal, never on this website or in GitHub. Configuration is stored in `~/.opencodereview/config.json`, shared with an existing OCR installation. The quality of Korean output depends on your selected model.

## Preview and review {#review}

Replace `path/to/your-repo` with the repository you want to review.

```bash
# Preview files without calling the model
ocr review --repo path/to/your-repo --preview

# Review local changes
ocr review --repo path/to/your-repo

# Use real branch names from your repository
ocr review --repo path/to/your-repo --from main --to feature-branch
```

If there are no changes, edit a file or choose an existing commit using `--commit`. Review suggestions before applying them.

See [Configuration](../configuration/), [CLI reference](../cli-reference/), and [Review rules](../review-rules/) for more options.
