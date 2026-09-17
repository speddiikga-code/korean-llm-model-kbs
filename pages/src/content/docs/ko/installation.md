---
title: 설치
sidebar:
  order: 4
---

KBS 한국어 에디션은 현재 **소스에서 빌드**해 설치합니다. 이 저장소의 독립 npm 패키지, Homebrew 패키지 또는 릴리스 바이너리는 아직 배포하지 않습니다. 원본 프로젝트의 패키지를 설치하면 이 한국어 포크가 아닌 원본 버전이 설치됩니다.

## 요구 사항 {#requirements}

- Git 2.41 이상
- Go 1.25.5 이상
- 의존성 다운로드를 위한 네트워크 연결

## 소스 받기 {#clone}

```bash
git clone https://github.com/speddiikga-code/korean-llm-model-kbs.git
cd korean-llm-model-kbs
```

## Windows {#windows}

PowerShell에서 실행합니다.

```powershell
go build -o ocr.exe ./cmd/opencodereview
.\ocr.exe version
.\ocr.exe config provider
.\ocr.exe config set language Korean
.\ocr.exe llm test
```

다른 프로젝트를 리뷰하려면 경로를 지정하세요.

```powershell
.\ocr.exe review --repo C:/path/to/your-repo --preview
.\ocr.exe review --repo C:/path/to/your-repo
```

어느 폴더에서든 `ocr`로 실행하려면 `ocr.exe`를 본인이 관리하는 실행 파일 폴더로 옮기고 그 폴더를 사용자 PATH에 추가하세요.

## macOS / Linux {#macos-linux}

```bash
go build -o ocr ./cmd/opencodereview
./ocr version
./ocr config provider
./ocr config set language Korean
./ocr llm test
```

다른 프로젝트를 리뷰하려면:

```bash
./ocr review --repo /path/to/your-repo --preview
./ocr review --repo /path/to/your-repo
```

선택 사항: 사용자 실행 경로에 복사합니다.

```bash
mkdir -p "$HOME/.local/bin"
cp ocr "$HOME/.local/bin/ocr"
```

`$HOME/.local/bin`이 PATH에 포함되어 있으면 어느 폴더에서든 `ocr`을 사용할 수 있습니다.

## 업데이트 {#update}

본인이 수정한 소스가 있다면 먼저 커밋하거나 별도 보관한 뒤 최신 변경 사항을 받고 다시 빌드하세요.

```bash
git pull --ff-only
```

그다음 해당 운영체제의 `go build` 명령을 다시 실행합니다. 소스 빌드에는 npm 자동 업데이트가 적용되지 않습니다.

## 설정과 세션 {#configuration}

설정은 `~/.opencodereview/config.json`에 저장됩니다. 기존 Open Code Review 설치와 같은 설정 디렉터리를 사용하므로 모델 설정과 세션을 공유할 수 있습니다. 기존에 다른 출력 언어를 설정했다면 `ocr config set language Korean`으로 한국어를 선택하세요.

API 키는 설정 파일 또는 제공업체가 지원하는 환경 변수로 관리하세요. Git 저장소에 커밋하지 마세요.

[빠른 시작](../quickstart/)에서 첫 리뷰를 진행하거나 [설정](../configuration/)에서 자체 호스팅 모델을 연결할 수 있습니다.
