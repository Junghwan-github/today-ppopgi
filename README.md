# 오늘의 뽑기

추억의 뽑기 웹 애플리케이션 
![스크린샷 2024-07-31 152121](https://github.com/user-attachments/assets/5af30896-1f35-41a3-9508-a8f094dd0134)

## Index

- [Introduce](#Introduce)
- [SourceCode](#SourceCode)
- [Contact](#Contact)

## Introduce

목적 : 종이로 된 추억의 뽑기의 단점을 보완하여, 누구나 쉽게 즐길수 있도록 웹애플리케이션 구현
주요 기능: 새로 시작 할때마다 랜덤으로 당첨이 정해지고, 그것을 뽑는 게임이며, 사용자의 목적에 따라 커스텀이 가능하도록 구현

![스크린샷 2024-07-31 152302](https://github.com/user-attachments/assets/2b6f8dc1-72eb-4eb7-b588-4ce2564e8465)

뽑기 유닛을 클릭하여 당첨을 확인할수있음.

![스크린샷 2024-07-31 152345](https://github.com/user-attachments/assets/7860c90d-4f21-47b4-8baa-ddc9b2cc11d0)

모바일 또는 앱에서 보여지는 화면

![스크린샷 2024-07-31 152433](https://github.com/user-attachments/assets/ae0f98eb-1779-49f9-8970-eef888e2cbcd)

1등 당첨시의 이벤트화면

![스크린샷 2024-07-31 152457](https://github.com/user-attachments/assets/5ac03b3f-1cb8-4f57-a8eb-0eee426c7e93)

사용자 커스텀

![스크린샷 2024-07-31 152522](https://github.com/user-attachments/assets/2ba605fd-8901-4141-bc17-29f523f63e0e)

사용자 커스텀 작성 예시

![스크린샷 2024-07-31 152548](https://github.com/user-attachments/assets/f3accd28-fef0-44c5-9ff7-52b24c95fe56)

사용자 커스텀 적용후 당첨 상품 목록 변경

![스크린샷 2024-07-31 152609](https://github.com/user-attachments/assets/804d31fb-032a-4fd2-85ec-0571d4b78d9a)

사용자 커스텀시 유닛 생성 수와 당첨 상품 수량이 맞지 않을시 꽝으로 설정됨

## SourceCode

### 기본 페이지 랜더링

  const [isSetting, setIsSetting] = useState({
    items: 0,
    rankValue: 0,
    ranks: [],
  });

useEffect(() => {

    let isUnit = 110;
    let rankValue = 5;

    const defaultLotteryArr = [];

    for (let i = 0; i < isUnit; i++) {
      let defaultLotteryNumber = Math.floor(Math.random() * isUnit + 1);

      if (defaultLotteryArr.indexOf(defaultLotteryNumber) === -1) {
        defaultLotteryArr.push(defaultLotteryNumber);
      } else {
        i--;
      }

    }

    //  첫 접속 및 새로고침 시 Math.random() 사용하여 난수를 추첨 후
    빈 배열에 담는다.

    const rankNo0 = defaultLotteryArr.slice(0, 1);
    const rankNo1 = defaultLotteryArr.slice(1, 4);
    const rankNo2 = defaultLotteryArr.slice(4, 10);
    const rankNo3 = defaultLotteryArr.slice(10, 30);
    const rankNo4 = defaultLotteryArr.slice(30);

    // 담긴 배열을 slice를 사용하여 새로운 배열로 다시 재 정의한다.

    setIsSetting({
      items: isUnit,
      rankValue: rankValue,
      ranks: [
        { rank_0: rankNo0 },
        { rank_1: rankNo1 },
        { rank_2: rankNo2 },
        { rank_3: rankNo3 },
        { rank_4: rankNo4 },
      ]
    })

    //useState의 객체에 담고있다.


  }, [])

#### 요약
useEffect를 사용하여 페이지 랜더링이 될때마다 난수를 추첨하고 그것을 하나의 배열에 담아 담긴 배열을 다시 재정의 한 후
useState객체에 담고 그것을 추출하는 방식이다.


### 사용자 커스텀 관련 코드

const rankInput = (e) => {
    // renderRank로 생성된 각 등수 당첨 개수 설정의 대한 input
    // value의 값이 들어오면 이벤트 실행

        const { className, value } = e.target;
        const rankRespectivelyArr = [];
        for (let i = 0; i < value; i++) {
            // input에 value만큼 난수 를 추첨
            let randomNumber = Math.floor(Math.random() * itemsValue + 1);
            if (rankRespectivelyArr.indexOf(randomNumber) === -1) {

                rankRespectivelyArr.push(randomNumber);
            } else {
                i--;
            }
        }

        // rankRespectivelyArr 배열에 담아둠

        
        setRankInputObj(prev => ({
            // 사용자가 input에 value를 썻다 지웠다 반복시 마지막 value에 대한 난수 추첨만 useState에 객체에 담아둠
            ...prev,
            [className]: rankRespectivelyArr
        }));

    };

    const renderRank = (idx) => {
        // 등수 설정 input에 value 가 들어오면 싱행되도록 함
        // value 를 idx 매개변수를 받음

        const rankArr = [];

        for (let i = 0; i < idx; i++) {
            rankArr.push(
                <div key={i}>
                    <span>{i + 1}등</span>
                    <input type="number" className={`rank_${i}`} onChange={rankInput} />
                    // rankinput함수를 호출
                </div>
            );
        }
        return rankArr;
    };



    const handleCreateBtn = () => {
        // 생성하기 버튼 클릭시 최종 useState 객체에 담음
        setIsSetting({
            items: itemsValue,
            rankValue: rankValue,
            ranks: Object.entries(rankInputObj).map(([key, value]) => ({ [key]: value }))
        });
        // 열려있는 모달창을 닫음
        setShowModal(false);
    };

#### 요약   
사용자 커스텀 사용시 등수 설정 input에 값이 변경되면 이벤트를 주어 해당 value만큼 반복하여 input을 생성하도록 되어있으며, 생성된 input 에 값이 설정되거나 변경되면 그 즉시 난수를 추첨하고 추첨된 난수를 배열에 담고있습니다.



### 유닛 랜더링 관련 코드
    const [activeStates, setActiveStates] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);


useEffect(() => {
        // 초기 상태 설정
        setActiveStates(new Array(isSetting.items).fill(false));

        // 랜덤 숫자 생성 및 설정
        const generateRandomNumbers = (count) => {
            const numbers = [];
            while (numbers.length < count) {

                // count 숫자 만큼 반복하여 난수 추첨
                let randomNumber = Math.floor(Math.random() * count + 1);
                if (!numbers.includes(randomNumber)) {
                    numbers.push(randomNumber);
                }
            }

            
            return numbers;
        };

        setRandomNumbers(generateRandomNumbers(isSetting.items));
        // isSetting.items 의 상태가 변경될때마다 실행될수있도록 함.
    }, [isSetting.items]);


    const checkRank = (number) => {
        // 등수 관련 함수
        const tier = isSetting.rankValue;

        for (let i = 0; i < tier; i++) {
            const rankKey = `rank_${i}`;
            if (isSetting.ranks[i][rankKey].includes(number)) return `${i + 1}등`;
        }

        // 매개변수인 number 와 앞서 코드에서 당첨 난수 배열의 숫자를 찾아 각 등수를 return함.

        return <>꽝<span style={{ fontSize: 11, fontWeight: 400, fontFamily: "var(--base-font)", color: "#aaa" }}>다음 기회에 ㅠ_ㅜ </span></>;

        // 일치하지 않는 value 들은 꽝으로 처리
    };

        const clickAddClassActive = (index) => {
            // 각 유닛 요소 클릭시 이벤트 설정함수
        const randomNumber = randomNumbers[index];
        // 설정에서 생성된 유닛의 난수의 배열 (당첨 난수 배열X)
        const rank = checkRank(randomNumber);
        // 변수 rank에 checkRank 함수 설정

        setActiveStates(prevState => {
            if (prevState[index]) return prevState;
            // 해당 요소 클릭이벤트 1회 발생시 리턴 (2회 클릭 방지)
            const newStates = [...prevState];
            newStates[index] = true;
            // 해당 요소 1회 클릭시 true 값을 반환하여 if에서 return 되도록 유도
            return newStates;
        });

        if (rank === "1등") {
            setShowModal(true);
        }

    };

#### 요약
생성된 유닛에 수 만큼 난수를 추첨하고 해당 유닛에 난수를 부여함
유닛에 클릭 이벤트가 발생하게 되면 앞서 생성된 당첨 난수 배열 과 
해당 유닛의 난수를 비교 하고 그 값이 일치 하다면 등수로 리턴을 하고있다.
일치 하지 않는다면 꽝 으로 처리 하고있다.


## Contact

![스크린샷 2024-07-31 152623](https://github.com/user-attachments/assets/2ea2f0f8-92e4-4de7-ac2a-4250d6856dbb)