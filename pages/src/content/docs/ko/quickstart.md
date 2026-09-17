---
title: 빠른 시작
sidebar:
  order: 3
---

**korean llm model kbs**는 Alibaba Open Code Review 기반의 한국어 코드 리뷰 CLI입니다. 별도로 학습한 모델이나 브라우저에서 실행되는 채팅 서비스가 아닙니다. 이 사이트는 사용 안내와 문서를 제공합니다.

## 준비물 {#prerequisites}

- **Git 2.41 이상**
- **Go 1.25.5 이상**
- 사용할 **LLM 제공업체의 API 키와 모델** 또는 [위임 모드](../integrations/delegate/)를 지원하는 호스트 에이전트

코드 리뷰에 필요한 코드와 맥락은 선택한 모델 엔드포인트로 전송됩니다. 자체 호스팅 모델을 쓰려면 호환되는 API 서버를 별도로 준비하세요. API 사용료는 제공업체의 정책에 따릅니다.

## 1. 소스 복제 및 빌드 {#install}

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

아래 예시의 `ocr`은 빌드한 실행 파일을 뜻합니다. PATH에 추가하지 않았다면 Windows에서는 `.\ocr.exe`, macOS / Linux에서는 `./ocr`로 바꿔 실행하세요. 더 자세한 내용은 [설치](../installation/)를 참고하세요.

## 2. 모델 연결 {#configure}

```bash
ocr config provider
ocr config set language Korean
ocr llm test
```

제공업체를 선택하고, 로컬 터미널에 API 키를 입력한 뒤 사용할 모델을 고릅니다. API 키를 이 웹사이트나 GitHub에 입력하지 마세요. 설정은 `~/.opencodereview/config.json`에 저장되며 기존 OCR 설정이 있으면 함께 사용됩니다.

연결 테스트가 실패하면 모델 접근 권한, API 키, 엔드포인트 URL을 [설정 문서](../configuration/)에서 확인하세요. 한국어 리뷰 품질은 연결한 모델의 한국어 지원 능력에 따라 달라집니다.

## 3. 리뷰 범위 확인 {#preview}

`path/to/your-repo`를 리뷰할 Git 저장소의 실제 경로로 바꾸세요. 빌드한 KBS 폴더에서 다른 저장소를 지정할 수 있습니다.

```bash
ocr review --repo path/to/your-repo --preview
```

`--preview`는 대상 파일만 확인하며 LLM을 호출하지 않습니다. 변경 사항이 없으면 먼저 리뷰할 저장소에서 파일을 수정하거나 커밋 범위를 지정하세요.

## 4. 한국어로 리뷰 {#review}

```bash
# 현재 작업 내용
ocr review --repo path/to/your-repo

# 브랜치 비교: 실제 존재하는 브랜치 이름으로 바꾸세요
ocr review --repo path/to/your-repo --from main --to feature-branch

# 특정 커밋: 실제 커밋 해시로 바꾸세요
ocr review --repo path/to/your-repo --commit abc123
```

리뷰는 수정 제안입니다. 적용하기 전에 코드 맥락과 테스트 결과를 직접 확인하세요.

## 다음 단계 {#next}

- [설정](../configuration/) — 모델, 언어, API 엔드포인트 설정
- [CLI 레퍼런스](../cli-reference/) — 명령과 플래그
- [리뷰 규칙](../review-rules/) — 팀의 리뷰 기준 적용
- [세션 뷰어](../viewer/) — 로컬 리뷰 이력 확인
- [원본 프로젝트](https://github.com/alibaba/open-code-review) — 기반 프로젝트와 Apache-2.0 라이선스
