# korean llm model kbs website

React, TypeScript, and Webpack website for the Korean edition of Alibaba Open Code Review. The default language is Korean; the language menu also offers English. The CLI and model execution run locally, not on GitHub Pages.

## Development

Use Node.js 24.15 or later (Node 24 is used in CI).

```bash
cd pages
npm ci
npm run dev
```

The development server opens on port 3030. Use the Windows, macOS, or Linux platform control to copy the corresponding source-build commands.

## Validation and production

```bash
npm run typecheck
npm test
npm run build
```

The build script is cross-platform and writes `dist/`. Vitest uses two thread workers for compatibility with this Windows development environment. Webpack may report bundle-size warnings for inherited Markdown and Mermaid documentation libraries; those are loaded only when needed.

## GitHub Pages

The site is deployed by the repository's Pages workflow to:

https://speddiikga-code.github.io/korean-llm-model-kbs/

HashRouter keeps documentation deep links and reloads functional without server rewrites. Webpack derives its asset path from the running bundle, so assets also work at the repository subpath. No custom domain is configured.

## Edition scope

The homepage, navigation, metadata, quickstart, and Korean/English installation instructions describe this fork. No separate npm package or release binary is advertised. Advanced integration documentation is retained as clearly labelled upstream reference material and requires adaptation when an upstream template automatically installs or updates the original CLI.

Original Apache-2.0 notices are preserved. See the repository root LICENSE and attribution notice.
