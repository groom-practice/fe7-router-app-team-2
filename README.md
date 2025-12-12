# 📝 React Router를 이용한 게시판 앱

이 프로젝트는 React와 React Router를 사용하여 간단한 게시물 관리 애플리케이션입니다.

## ✨ 주요 기능

- 로그인 할수 있는 메인페이지
- 게시물 목록 조회
- 게시물 상세 페이지 조회
- 게시물 수정

## 📂 폴더 구조

```
/
├─── .github/         # GitHub 템플릿 (이슈, PR)
├─── public/          # 정적 파일 (이미지 등)
├─── src/             # 소스 코드 루트
│   ├─── apis/        # API 통신 관련 함수
│   ├─── assets/      # 프로젝트에서 사용하는 자원
│   ├─── components/  # 공통 재사용 컴포넌트
│   ├─── layout/      # 페이지 레이아웃 컴포넌트
│   ├─── pages/       # 라우팅되는 페이지 컴포넌트
│   │   ├─── Home/
│   │   ├─── PostList/
│   │   ├─── PostDetail/
│   │   └─── EditPost/
│   ├─── routes/      # 라우터 설정
│   ├─── App.jsx      # 메인 애플리케이션 컴포넌트
│   └─── main.jsx     # 애플리케이션 진입점
├─── .gitignore
├─── package.json     # 프로젝트 정보 및 의존성
└─── README.md        # 프로젝트 문서
```

## © 커밋 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서만 변경
- `style`: 코드 스타일 변경 (기능 영향 없음)
- `refactor`: 기능 변경 없는 코드 구조 개선
