# 새 책 출간 가이드

이 프로젝트는 별도의 관리자 화면 없이 Git 파일만으로 책을 관리합니다.

## 1. 책 추가

`src/content/books/<slug>/book.json`을 생성합니다. `slug`는 영문 소문자·숫자·하이픈만 사용하세요.

```json
{
  "title": "책 제목",
  "subtitle": "책 부제",
  "description": "카드에 표시할 소개",
  "category": "engineering",
  "level": "입문",
  "cover": "iris",
  "glyph": "∑",
  "volume": 4,
  "order": 4,
  "status": "published"
}
```

허용 category: `ai`, `engineering`, `life` / cover: `iris`, `ink`, `sage`.
`status: draft`면 책장에서 숨깁니다.

## 2. 챕터 추가

같은 폴더에 `01-example.mdx`를 만들고 아래 프런트매터를 작성합니다.

```mdx
---
title: 예시 챕터
description: 챕터 소개
book: my-book
chapter: 1
minutes: 8
---

# 첫 장

본문...
```

`book`은 폴더명(`slug`)과 반드시 일치해야 합니다. `draft: true`는 목차에서 해당 챕터를 숨깁니다. 챕터는 `chapter` 번호순으로 표시됩니다.

## 3. 인터랙션 삽입

퀴즈 컴포넌트:

```mdx
import Quiz from '../../../components/interactive/Quiz';

<Quiz client:load
  question="질문?"
  choices={['보기 1', '보기 2', '보기 3']}
  answer={1}
  explanation="정답 해설"
/>
```

복잡한 기능은 `src/components/interactive/`에 React 컴포넌트를 만든 뒤 MDX에서 불러옵니다. 전체 책을 React SPA로 바꾸지 말고 **인터랙션만 선택적으로 hydration**합니다.

## 4. GitHub Pages 경로

현재 `astro.config.mjs`는 `wontaeJeong/interactive-books`에 맞춰져 있습니다. 저장소 이름을 바꾸면 `REPO_NAME`을 변경하세요. 웹사이트는 `/interactive-books/` 아래에서 서빙됩니다. 모든 내부 링크에는 `href()` 도우미를 사용합니다.

## 5. 출간 프로세스

1. 새 책/원고 작성
2. `npm run build`로 빌드 확인
3. GitHub `main`에 push
4. GitHub Actions가 자동으로 Pages에 배포

첫 배포 전에 GitHub → 해당 저장소 → Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.

## 6. 개인용 운영 원칙

- 첫 버전: 사용자 계정·백엔드·CMS 없이 운영
- 읽음 여부: 브라우저 localStorage 저장 (브라우저/기기 바뀌면 동기화되지 않음)
- 콘텐츠는 Git 버전 관리, 기계 생성 원고는 검토 후 출간
- 이미지·시뮬레이터는 저작권·출처를 확인하고 추가
- 기존에 작성했던 책의 원문은 이 템플릿에 **포함되어 있지 않음**; 해당 소스 확보 후 MDX로 이전
