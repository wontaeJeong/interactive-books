# 생각의 서가 — interactive-books

Astro + MDX + React 기반 개인용 인터랙티브 책장. **단일 Git 저장소**에서 책의 메타데이터, 원고, 재사용 가능한 실험/퀴즈 컴포넌트, GitHub Pages 배포까지 관리합니다.

## 미리보기

- 메인: `https://wontaeJeong.github.io/interactive-books/` (배포 이후 활성화)
- 책장: 분야 필터 · 검색 · 책별 목차 · 챕터 리더 · 읽음 표시
- 실험: 컨텍스트 윈도우, 건폐율/용적률 계산기, 퀴즈
- 테마: 밝은/어두운 화면 전환

> 현재 실려 있는 3권 6개 챕터는 **구조와 인터랙션을 보여주는 새 샘플 원고**입니다. 이전에 만든 실제 완성 원고는 아직 통합되지 않았습니다.

## 로컬 실행

Node.js 22 이상을 권장합니다.

```bash
npm install
npm run dev
```

정적 빌드: `npm run build` / 로컬 프리뷰: `npm run preview`.

## GitHub Pages 배포

1. GitHub에서 `wontaeJeong/interactive-books` **빈 공개 저장소**를 생성합니다. (README, .gitignore는 GitHub에서 자동 생성하지 않기.)
2. 현재 프로젝트 폴더에서:

```bash
git init -b main
git add .
git commit -m "feat: initialize interactive bookshelf"
git remote add origin https://github.com/wontaeJeong/interactive-books.git
git push -u origin main
```

3. GitHub → Settings → Pages → Build and deployment → Source에서 **GitHub Actions**를 선택합니다.
4. Actions의 `Publish bookshelf to GitHub Pages`가 성공하면 사이트가 출간됩니다.

다른 사용자나 다른 레포 이름으로 변경할 경우 `astro.config.mjs`의 `site`와 `REPO_NAME`을 수정하세요.

## 구성

- `src/content/books/<slug>/book.json` — 책별 메타데이터
- `src/content/books/<slug>/*.mdx` — 각 책의 원고
- `src/components/interactive/` — 공통 React 실험/퀴즈
- `src/components/BookExplorer.tsx` — 책장 필터/검색
- `src/pages/` — Astro 정적 페이지
- `.github/workflows/pages.yml` — Pages 자동 빌드·배포

새 책/챕터 출간 방법은 [집필 가이드](docs/AUTHORING.md)를 참고하세요.
