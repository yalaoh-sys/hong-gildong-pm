# 홍길동 – IT 프로젝트 PM 퍼스널 브랜딩 사이트

순수 HTML/CSS/JS로 만든 1페이지 정적 사이트입니다. 빌드가 필요 없습니다. 내용은 모두 더미 데이터입니다.

## 로컬 확인
`index.html`을 브라우저로 열거나 `npx serve .` 로 실행합니다.

## GitHub 업로드
```bash
git init
git add .
git commit -m "feat: 퍼스널 브랜딩 사이트 초기 버전"
git branch -M main
git remote add origin https://github.com/<계정>/<저장소>.git
git push -u origin main
```

## Vercel 배포
1. vercel.com → Add New → Project → GitHub 저장소 Import
2. Framework Preset: **Other**, Build Command / Output Directory 비워 두기
3. Deploy. 이후 `main`에 push하면 자동 배포됩니다.

## 커스터마이징
- 색상: `styles.css` 상단 `:root` 변수
- 내용: `index.html` 각 섹션
- 연락처/SNS 링크는 실제 정보로 교체하세요.
