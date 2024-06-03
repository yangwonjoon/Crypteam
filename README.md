# Automatic trading System for Cryptocurrency using deep learning
### 💡 **가상화폐의 상승과 하락을 예측하는 자동매매 플랫폼**

<br><br>

<!-- 기술 스택  -->
## Tech Stack
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">&nbsp;
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">&nbsp;
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=Sass&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=Material-UI&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Lightweight--charts-0081CB?style=for-the-badge&logo=Lightweight-charts&logoColor=white"><br>
  <img src="https://img.shields.io/badge/Binance-FFD700?style=for-the-badge&logo=Binance&logoColor=black">&nbsp;
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=Zoom&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">&nbsp;
</p>
<br><br>

## 기능 소개
-----
### 백테스팅
- AI 모델 기반 과거 가상화폐 데이터의 상승 및 하락 시점을 마킹한 백테스팅 결과 시각화
<p align="center">
  <img width="1100" alt="Untitled" src="https://github.com/yangwonjoon/Crypteam/assets/102780846/9a098cbf-e539-4aae-9604-cf0cfbaeff2e">
</p>


### 모의투자, 실전투자
- **Binance API**를 사용하여 실시간 가상화폐 데이터 연동 및 차트 시각화
- 투자 시작 시 AI 모델 기반 상승과 하락에 따른 매수 및 매도 결과 시각화
<p align="center">
  <img width="1100" alt="Untitled (1)" src="https://github.com/yangwonjoon/Crypteam/assets/102780846/d91c7adf-7832-462e-9a73-bebbd5747067">
</p>

### 코인뉴스 몰아보기
<p align="center">
  <img width="1100" alt="Untitled (2)" src="https://github.com/yangwonjoon/Crypteam/assets/102780846/4a226c6e-ae9d-404f-babc-d04c7e3a770f">
</p>
<br><br>

<!--트러블 슈팅-->
## Trouble Shooting

<details>
  <summary>Binance API 연동 문제</summary>
  <br>
  
  **문제 상황**: 실시간 가상화폐 데이터를 Binance API를 통해 가져오는 과정에서 데이터가 제대로 연동되지 않거나 업데이트 주기가 불규칙하여 사용자에게 신뢰성 있는 정보를 제공하는 데 어려움 발생

  **문제 접근**: `axios`를 사용하여 Binance API로부터 데이터를 가져오는 비동기 요청 구현, 데이터 동기화 문제를 해결하기 위해 추가적인 오류 처리 및 재시도 로직 구현, `useEffect` 훅을 활용하여 컴포넌트가 마운트될 때 초기 데이터를 설정하고, `setInterval`을 통해 일정 주기로 데이터를 업데이트하도록 설정

  **결과**:
  - 실시간 데이터 연동이 안정화되고, 사용자에게 신뢰성 있는 실시간 데이터 제공 가능

  <br>
</details>

<details>
  <summary>Lightweight 차트 라이브러리 사용 문제</summary>
  <br>
  
  **문제 상황**: Lightweight 차트 라이브러리를 사용하여 가상화폐 데이터를 시각화하는 과정에서 초기 설정과 데이터 업데이트 과정에서 어려움 발생

  **문제 접근**: `createChart`와 `addCandlestickSeries`를 사용하여 초기 차트를 설정하고, `useRef`를 통해 차트와 시리즈 인스턴스를 관리. 데이터를 효율적으로 업데이트하기 위해 `update` 메서드를 사용하여 실시간으로 차트를 갱신. 데이터가 많아질 경우 성능 저하를 방지하기 위해 데이터 양을 적절히 관리

  **결과**:
  - 차트 초기 설정 및 실시간 데이터 업데이트가 안정적으로 동작하여 사용자에게 정확한 시각화 정보 제공 가능

  <br>
</details>

<br><br>

<!--기술적 의사결정-->
## 기술적 의사결정

| **기술**                    | **선택 이유**                                                                                           | **활용 예시**                                                        |
|--------------------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| **React**                | 컴포넌트 기반 구조로 재사용 가능한 UI 요소 생성 용이, 상태 관리가 쉬워 높은 유지보수성 제공                        | 가상화폐 데이터 시각화 및 사용자 인터페이스 구현                                 |
| **Material-UI**          | React 애플리케이션을 위한 인기 있는 UI 프레임워크로, 풍부한 컴포넌트와 커스터마이징 옵션을 제공하여 일관된 UI/UX 구현 가능       | 폼, 버튼, 모달 등의 UI 컴포넌트 구현                                            |
| **Lightweight-charts**    | 가볍고 성능이 우수한 차트 라이브러리로, 대규모 실시간 데이터 시각화에 적합                                                  | 실시간 가상화폐 데이터와 백테스팅 결과 시각화                                      |
| **Binance API**           | 가상화폐 거래와 관련된 풍부한 데이터를 제공하며, 실시간 데이터 스트리밍 기능을 지원                                   | 실시간 가상화폐 데이터 연동 및 시각화                                        |

<br>

<!--개발 기간-->
## Develop Period
2023/02/10 → 2023/09/22

<br>

<!-- 개발 인원 -->
## Team Members
- **FE**: 2명
- **BE**: 2명
