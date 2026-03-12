# Instagram DM Mini Window (Chrome Extension)

인스타그램 DM을 별도 작은 팝업 창으로 여는 크롬 확장입니다.

## 기능
- 확장 아이콘 클릭 시 즉시 DM 창 토글(열기/닫기)
- 단축키로 즉시 DM 창 토글(열기/닫기)
- 고정 크기(420x640)로 열림
- 현재 크롬 창 기준 우측 하단에 열림

## 설치 방법 (개발자 모드)
1. 크롬에서 `chrome://extensions` 열기
2. 우측 상단 `개발자 모드` ON
3. `압축해제된 확장 프로그램을 로드합니다` 클릭
4. 이 폴더 선택:
   - `/Users/hyeonkyu/dev/mini_dm`

## 사용 방법
1. 인스타그램에 로그인되어 있어야 함
2. 확장 아이콘 클릭 -> DM 창 열기/닫기
3. 단축키 `Alt+Shift+M`(macOS: `Control+Shift+M`)으로 열기/닫기
4. 필요 시 `chrome://extensions/shortcuts`에서 키 변경

## 파일 구조
- `manifest.json`: 확장 설정 (MV3)
- `background.js`: DM 창 토글 및 우측 하단 배치
