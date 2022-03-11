## Description
검색창 ui 및 검색어 추천 기능을 개발하는 프로젝트입니다.
팀원 : 2명(성현, 윤구)

개발 스팩 : 
- React
- JS
- styled-component + globalStyle
- redux-toolkit+RTK query
- storybook
- protoType.js

개발 규칙 : 
1. rebase 후 이슈 + PR 등록 
2. 코드 리뷰 및 approve
3. merge

## 배포링크


## Usage(자세한 실행 방법)

1. git clone
```
git clone https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-10-3.git
```
2. 클론한 폴더를 인터프린터나 컴파일러로 열기 
3. 필요한 라이브러리 설치 
```
npm install
```
4. 실행
```
npm run start
```

## <성현님>
   
### src/service/recomments.js
   
## redux-toolkit, RTK query 사용 네트워크 요청 데이터 상태 관리

<img width="1440" alt="스크린샷 2022-03-11 오전 11 09 24" src="https://user-images.githubusercontent.com/70502670/157789369-a1fb60d4-4f01-4f09-9abc-081f8e43e3a2.png">


- 네트워크 요청 및 받아온 데이터 상태 관리를 위해 리덕스 툴킷을 사용합니다. 
- 효율적인 로컬캐싱 관리를 위해 RTK query를 사용하여 캐시 데이터 수명 주기(expire time)을 설정해 주었습니다. 
   
### src/component/Search/Search.js

## 검색어 추천 API 호출 최적화 
   
<img width="1440" alt="스크린샷 2022-03-11 오전 11 15 42" src="https://user-images.githubusercontent.com/70502670/157789383-6abb08e4-52fc-45dd-8dbc-74914a96a364.png">


1. 최근 5개 검색어 추천 데이터 브라우저 스토리지 저장, 네트워크 이용 네이터 요청 전 브라우저 스토리지에서 현재 검색어 있는 지 확인하고 있으면 네트워크 요청하지 않습니다.
	- 브라우저 종료 시 데이터가 삭제될 수 있도록 세션 스토리지를 사용했습니다.
  - 검색어의 공백을 지우고 저장함으로써, 같은 검색어 api 호출을 엄격하게 제한했습니다. 
  - 같은 검색어는 세션 스토리지에 저장하지 않도록 개발했습니다. 
 
2. input 이벤트의 onChange가 800 milliSeconds 동안 일어나지 않으면 검색어 추천 알고리즘을 가동하여 api 를 호출하거나 브라우저 스토리지에서 결과를 찾습니다. (debounce)
   
### 개발 중 어려웠던 점 && 해결
   
- onChange 이벤트가 멈췄을 때, 특정 시간이 지난후 검색 알고리즘이 진행되도록 개발하고 싶었다. 처음에는 멈춤에 집중에서 debounce 개념을 떠올리지 못했는데, debounce를 통해 마지막 onChange 이벤트가 발생한 후에 검색 알고리즘이 진행되도록 하여 성능 최적화를 진행할 수 있었다. 
- 리덕스 툴킷을 처음써봐서 조금 어색했는데, 리덕스로 개발할 떄 보다 코드량도 적고 비동기 처리도 쉬워서 좋았다. 
