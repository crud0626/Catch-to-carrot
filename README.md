# Catch-to-carrot

## 프로젝트 설명

정해진 시간내에 버그를 피해 당근을 잡으면 승리하는 게임입니다.

<div align=center><img width="700" src="https://user-images.githubusercontent.com/72868495/173979130-390f6eba-b563-439c-81e9-ae0d45536194.png" /></div>

Demo Link : [Catch-to-carrot](https://crud0626.github.io/Catch-to-carrot/)

## 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>

## 지원 브라우저

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge ✔️                                                                                                                                                                                                         | last version ✔️                                                                                                                                                                                                   | last version ✔️                                                                                                                                                                                               |

## 특징

- 모바일 환경을 감안한 아이템 배치<br><br>
  다양한 뷰포트 사이즈에 맞게 아이템이 배치될 수 있도록 유동적으로 아이템을 배치해야 했습니다.<br>
  다만, 적용 도중 **이미지 크기로 인해 위치가 0vw(vh) 또는 100vw(vh)에 가깝게 배치되면 스크롤바가 생기는 현상을 발견**하였습니다.<br>
  이를 해결하기 위해 유저가 플레이 버튼을 클릭하면 **현재 뷰포트의 크기를 기준으로
  <br>아이템의 절반크기를 제외하고 배치될 수 있도록 배치 가능 영역을 계산하는 로직을 추가**하였습니다.

---

- 일시정지 기능 추가<br><br>
  게임 사용성 개선을 위해 일시정지 기능을 추가하였습니다.<br>
  다만, 일시정지 기능을 적용하는 단계에서 일시정지 중 아이템이 클릭되는 현상을 발견했고 이를 막기 위해 2가지 방법에 대해 고민하였습니다.<br>

  > 1. 기존에 등록된 이벤트를 제거하는 방법
  > 2. 모달을 감싸는 컨테이너를 추가해 필드 부분을 컨테이너로 가리는 방법

<div align=center><img src="https://user-images.githubusercontent.com/72868495/142399261-e3edb861-328b-42dc-9b69-a3abcac3e522.png"/></div>

위 2가지 방법을 모두 수행해보고 성능 측정 및 코드의 가독성을 고려했을 때 두번째 방법이 적합하다고 판단되어 두 번째 방법으로 적용하였습니다.

---

- 일시정지 및 난이도 설정 기능 추가<br><br>
  난이도가 있으면 좋을 것 같아 Easy, Normal, Hard로 3가지의 난이도 설정 기능을 추가하였습니다.<br>
  마크업은 input태그의 radio를 통해 마크업 하였으며 난이도에 따라 아이템의 개수가 달라집니다.<br><br>
  **난이도를 선택하지 않으면 시작할 수 없고 게임 진행중 및 일시정지중에는 난이도를 변경할 수 없도록 하였으며<br>
  게임 종료시 난이도 선택 창을 표시하며 이전에 선택된 난이도를 유지시켜 별도 동작 없이 redo버튼을 클릭하게 되면 이전 난이도 그대로 진행되도록 로직을 작성**했습니다.
