'use client';
import { useEffect, useState } from "react";
import Setting from "./components/content/setting";
import styles from "./page.module.css";
import Modal from "./components/modal/modal";
import Main from "./components/content/main";
import { IoIosSettings, IoMdRefresh } from "react-icons/io";

export default function Home() {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }


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

    const rankNo0 = defaultLotteryArr.slice(0, 1);
    const rankNo1 = defaultLotteryArr.slice(1, 4);
    const rankNo2 = defaultLotteryArr.slice(4, 10);
    const rankNo3 = defaultLotteryArr.slice(10, 30);
    const rankNo4 = defaultLotteryArr.slice(30);



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



  }, [])


  const prizeListRender = () => {

    const prizeArr = [];

    for (let i = 0; i < isSetting.rankValue; i++) {
      prizeArr.push(

        <li key={i}>
          <span>{i + 1}등</span>
          <input type="text" placeholder={`${i + 1}등 상품을 작성해주세요`} />
        </li>

      )
    };
    return prizeArr;
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  const [titleHeight, setTitleHeight] = useState(320);



  useEffect(() => {

    const titleHeightUpdate = () => {

      const titleElement = document.querySelector(`.${styles.title}`);
      if (titleElement) {
        const height = titleElement.offsetHeight;
        setTitleHeight(height + 30);
      }
    }

    titleHeightUpdate();




  }, [isSetting])

  


  return (
    <main id={styles.main}>
      <div className={styles.container}>
        <div className={styles.title} >
          <div className={styles.useMenual}>
            <h3>사용 설명서</h3>
            <ul>
              <li><span>기본 설정은 110개로 되어있어요!</span></li>
              <li><span>1등 1개, 2등 3개, 3등 6개, 4등 20개, 5등 80개</span></li>
              <li><span>[설정] 버튼을 클릭하여 커스텀이 가능해요!</span></li>
            </ul>
          </div>
          <h1>오늘의 <span>뽑기</span></h1>
          <div className={styles.prize_list}>
            <ul>
              {prizeListRender()}
            </ul>
          </div>
          <div className={styles.button_wrap}>
            <button type="button" onClick={handleRefresh}><IoMdRefresh /> 다시하기 </button>
            <button type="button" onClick={openModal}><IoIosSettings /> 설정 </button>
          </div>
        </div>
        <Modal show={showModal}>
          <button type="button" className={styles.modal_setting} onClick={closeModal}>
            <span></span>
            <span></span>
          </button>
          <Setting setIsSetting={setIsSetting} setShowModal={setShowModal} />
        </Modal>
        <div className={styles.content_main} style={{ marginTop: titleHeight, height: `calc(100vh - ${titleHeight + 80}px)` }} >
          <Main isSetting={isSetting} autoHeight={{ height: `calc(100vh - ${titleHeight + 120}px)` }} />
        </div>
      </div>
    </main>
  );
}
