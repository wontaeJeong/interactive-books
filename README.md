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

프로젝트 저장소: https://github.com/wontaeJeong/interactive-books

배포 예정 주소: https://wontaeJeong.github.io/interactive-books/

이 저장소는 `main` 브랜치에 변경 사항이 올라오면 GitHub Actions에서 Astro 정적 사이트를 빌드하고 GitHub Pages에 출간하도록 구성되어 있습니다.

**최초 1회 설정:** [Settings → Pages](https://github.com/wontaeJeong/interactive-books/settings/pages)의 Build and deployment → Source 항목을 **GitHub Actions**로 선택합니다. 이후 변경사항은 자동으로 배포됩니다.

배포 실행 결과: [Actions](https://github.com/wontaeJeong/interactive-books/actions/workflows/pages.yml)

## 구성

- `src/content/books/<slug>/book.json` — 책별 메타데이터
- `src/content/books/<slug>/*.mdx` — 각 책의 원고
- `src/components/interactive/` — 공통 React 실험/퀴즈
- `src/components/BookExplorer.tsx` — 책장 필터/검색
- `src/pages/` — Astro 정적 페이지
- `.github/workflows/pages.yml` — Pages 자동 빌드·배포

새 책/챕터 출간 방법은 [집필 가이드](docs/AUTHORING.md)를 참고하세요.
