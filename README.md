# korean llm model kbs

**한국어로 코드를 읽고, 문제를 이해하고, 개선하세요.**

[웹사이트](https://speddiikga-code.github.io/korean-llm-model-kbs/) · [한국어 문서](https://speddiikga-code.github.io/korean-llm-model-kbs/#/docs/quickstart) · [원본 프로젝트](https://github.com/alibaba/open-code-review)

`korean llm model kbs`는 Alibaba의 **Open Code Review**를 기반으로 만든 한국어 우선 코드 리뷰 도구입니다. Git 변경 사항과 전체 파일을 분석하여 코드 위치와 함께 리뷰 결과를 제공합니다. CLI 명령어는 기존과 호환되는 `ocr`를 사용합니다.

이 프로젝트는 **새로 학습한 LLM이나 모델 가중치가 아닙니다**. 사용자가 선택한 LLM API 또는 호환되는 로컬 모델 서버에 연결하는 소프트웨어입니다. Alibaba의 공식 한국어 제품이 아닌 독립적인 파생 프로젝트입니다.

## 한국어 에디션

- 리뷰·스캔 결과의 기본 언어를 한국어로 설정합니다. 명시적인 언어 설정은 계속 적용됩니다.
- 한국어를 기본으로 표시하는 웹사이트와 한국어 설치·설정 문서를 제공합니다.
- Git 변경 사항 리뷰, 전체 파일 스캔, 규칙, 세션 관리, 위임 모드를 유지합니다.
- GitHub Pages에서 프로젝트 웹사이트를 배포합니다.

일부 CLI 상태 메시지와 고급 개발자 문서는 원본의 영어를 유지합니다. 모델 응답의 품질과 한국어 표현은 연결한 모델에 따라 달라집니다.

## 설치

필수 도구: **Git 2.41 이상**, **Go 1.25.5 이상**. 이 에디션은 소스 빌드를 지원합니다. 원본의 npm 패키지는 원본 제품을 설치하므로 이 에디션 설치 명령으로 사용하지 않습니다.

```sh
git clone https://github.com/speddiikga-code/korean-llm-model-kbs.git
cd korean-llm-model-kbs
```

Windows PowerShell:

```powershell
go build -o ocr.exe ./cmd/opencodereview
.\ocr.exe --version
.\ocr.exe config provider
.\ocr.exe config model
.\ocr.exe config set language Korean
```

macOS / Linux:

```sh
go build -o ocr ./cmd/opencodereview
./ocr --version
./ocr config provider
./ocr config model
./ocr config set language Korean
```

생성된 실행 파일을 PATH에 등록하면 어느 저장소에서든 `ocr`로 실행할 수 있습니다. 이미 다른 OCR 버전을 사용했다면 `ocr config set language Korean`으로 저장된 언어도 변경하세요.

## 첫 리뷰

검토할 Git 저장소로 이동한 뒤 실행합니다. PATH에 등록하지 않았다면 실행 파일의 전체 경로를 사용하세요.

```sh
ocr review
ocr review --from main --to feature-branch
ocr scan --path src
ocr review --format json --output review.json
ocr viewer
```

모델을 바꾸려면 `ocr config provider`와 `ocr config model`을 실행합니다. 한국어를 지원하는 OpenAI 호환 서버도 설정할 수 있습니다. 모델 이름은 실제 서버에서 제공하는 식별자를 사용하세요.

```sh
ocr config set provider custom
ocr config set providers.custom.protocol openai
ocr config set providers.custom.url http://localhost:8000/v1
ocr config set model YOUR_MODEL_ID
ocr llm test
```

인증이 필요한 서버의 API 키는 대화형 설정으로 입력하세요. 키를 저장소에 커밋하지 마세요. 리뷰를 실행하면 선택한 모델 엔드포인트로 관련 소스 코드가 전송됩니다. 공개 웹사이트는 문서 사이트이며 API 키나 소스 코드를 입력받지 않습니다.

별도 OCR API 연결 없이 호스트 코딩 에이전트에 위임할 수도 있습니다:

```sh
ocr delegate preview
ocr delegate rule src/main.go
```

## 개발 및 검증

```sh
make check
make test
cd pages
npm ci
npm run typecheck
npm test
npm run build
```

GitHub Actions는 Go 검증과 웹사이트 검증을 실행합니다. Pages 설정에서 **GitHub Actions**를 배포 소스로 선택하면 `main`의 변경 사항을 웹사이트에 배포합니다. 웹사이트는 정적 문서이며 실제 리뷰 엔진은 로컬 CLI에서 실행합니다.

## 원본과 라이선스

원본: [alibaba/open-code-review](https://github.com/alibaba/open-code-review). 저작권과 [Apache License 2.0](LICENSE)을 유지합니다. 변경 내역과 출처는 [NOTICE](NOTICE)에 기록되어 있습니다. 원본의 성능 평가나 사용자 규모는 이 파생 버전에 대한 별도 검증 결과가 아닙니다.

한국어 에디션의 문서·기본값·배포 설정은 사용자의 요청에 따라 Codex의 도움으로 작성되었습니다.
