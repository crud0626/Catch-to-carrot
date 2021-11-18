# Catch-to-carrot
이 프로젝트는 드림코딩 by 엘리의 강의를 토대로 만들었습니다.

## 프로젝트 설명
정해진 시간내에 버그를 피해 당근을 잡으면 승리하는 게임입니다.

## 기술스택
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 

## 크로스 브라우징 테스트
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome |
| :---------: | :---------: | :---------: |
| 95| 94| 96

## 개인적으로 추가한 기능
1. 일시정지 기능
> 강의 프로젝트에는 일시정지 없이 중지 기능만 있었으나 일시정지 기능이 있으면 좋겠다고 생각되어 추가해보았습니다.
2. 일시정지 및 게임중지시에 아이템 클릭을 방지하는 기능.
> 강의에서는 조건문을 통해 아이템의 클릭을 막았지만 조건문이 아닌 다른 방법을 통해 막아보고 싶었고 일시정지 및 중지시 커서가 포인터로 변경되는것도 원하지 않아 2가지 방법을 생각해보았습니다.</br>
첫번째 방법은 필드에 등록된 이벤트를 제거하고 cursor: pointer속성을 일시적으로 해제하는 방법.</br>
두번째는 모달 바깥쪽에 필드 크기의 컨테이너를 추가해 필드 부분을 컨테이너로 덮어 씌우는 방법이었습니다.</br>
두 가지 방법을 모두 구현해 보았는데 코드의 가독성과 성능 측정 결과를 종합해봤을 때 두번째 방법이 적합하다고 판단되어 적용하였습니다.
(측정 사진)
## 구현 및 버그로 인해 어려웠던 부분
1. 예상하지 못했던 호이스팅
> 카운트를 위해 선언했던 전역변수를 모듈화에 대비해 인자로 넘겼는데 함수 내부에서 호이스팅 되어 전역변수는 줄어들지 않고 지역변수의 값만 변경되는 부분을 1시간 가량 테스트 한 후에 발견하였습니다.</br>
모듈화하기전이었기 때문에 인자와 파라미터를 제외하고 실행구문에서 전역변수로 접근하게끔 하여 해결하였습니다.
2. 모바일 환경을 대비한 아이템 배치
> 아이템이 난수를 통해 랜덤하게 배치되기 때문에 아이템의 위치를 어떤 unit을 사용하여 배치할지에 대한 고민을 많이 했습니다.</br>
아이템의 크기를 조금 더 유동적으로 하고 싶어서 vw와 vh를 사용하려고 했지만 아이템의 크기로 인해 0vw(vh) 또는 100vw(vh) 근처로 아이템이 배치되면 스크롤이 생기는 현상을 발견했습니다.</br>
아이템의 절반크기를 제외하고 아이템을 배치해야 했는데 아이템의 배치 가능 영역을 모바일 화면 기준으로 맞추게 되면 배치 가능한 영역이 급격하게 줄어들어 데스크탑 환경에서의 아이템 배치가 원활하게 될 것 같지 않았습니다.
</br> 그래서 플레이 버튼 클릭 시 유저의 브라우저 화면크기를 바탕으로 아이템을 배치하는 방식으로 코드를 작성하였습니다.</br>


## 수정 예정인 부분
- [x] ~~SCSS 적용예정~~
- [ ] 클래스의 초기 값을 대입하는 부분도 클래스로 만들어 값 지정 및 아이템 사이즈 관련 값들을 캡슐화
- [ ] 버그 클릭 후 모달창이 보이는 상황에서 play버튼을 누르게 되면 이어서 플레이 가능한 버그 수정필요
- [ ] 난이도 추가 (Easy-5, Normal-10, Hard-15)