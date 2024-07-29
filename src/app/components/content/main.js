import { useState, useEffect } from "react";
import styles from "./main.module.css";
import Modal from "../modal/modal";

const Main = ({ isSetting, autoHeight }) => {
    const [activeStates, setActiveStates] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const closeRankModal = () => {
        setShowModal(false);
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    useEffect(() => {
        // 초기 상태 설정
        setActiveStates(new Array(isSetting.items).fill(false));

        // 랜덤 숫자 생성 및 설정
        const generateRandomNumbers = (count) => {
            const numbers = [];
            while (numbers.length < count) {
                let randomNumber = Math.floor(Math.random() * count + 1);
                if (!numbers.includes(randomNumber)) {
                    numbers.push(randomNumber);
                }
            }
            return numbers;
        };

        setRandomNumbers(generateRandomNumbers(isSetting.items));
    }, [isSetting.items]);

    const checkRank = (number) => {
        const tier = isSetting.rankValue;

        for (let i = 0; i < tier; i++) {
            const rankKey = `rank_${i}`;
            if (isSetting.ranks[i][rankKey].includes(number)) return `${i + 1}등`;
        }

        return <>꽝<span style={{ fontSize: 11, fontWeight: 400, fontFamily: "var(--base-font)", color: "#aaa" }}>다음 기회에 ㅠ_ㅜ </span></>;
    };

    const clickAddClassActive = (index) => {

        const randomNumber = randomNumbers[index];
        const rank = checkRank(randomNumber);

        setActiveStates(prevState => {
            if (prevState[index]) return prevState;
            const newStates = [...prevState];
            newStates[index] = true;
            return newStates;
        });

        if (rank === "1등") {
            setShowModal(true);
        }

    };

    const renderUnitsCreate = (idx) => {
        const itemsArr = [];

        for (let i = 0; i < idx; i++) {
            const randomNumber = randomNumbers[i];
            const rank = checkRank(randomNumber);

            itemsArr.push(
                <div
                    key={i}
                    onClick={() => clickAddClassActive(i)}
                    className={activeStates[i] ? `${styles.units} ${styles.active}` : styles.units}
                >
                    <div className={styles.unit}>
                        <p>오늘의<span>뽑기</span></p>
                    </div>
                    <div className={`${styles.unit} ${styles.back}`}>
                        <p style={{ color: rank === "1등" ? "#EE4E4E" : "#000", fontSize: rank === "1등" ? 30 : "1.2rem" }}>{rank}</p>
                    </div>
                </div>
            );
        }
        return itemsArr;
    };

    return (
        <div className={styles.units_wrapper} style={autoHeight}>
            {renderUnitsCreate(isSetting.items)}
            <Modal show={showModal}>
                <div className={styles.rank_modal}>
                    <p><span className={styles.lottery}>1등 당첨</span> <span className={styles.en}>Congratulations!</span> <span className={styles.ko}>축하합니다!</span></p>
                    <div>
                        <button type="button" className={styles.continue} onClick={closeRankModal}>계속하기</button>
                        <button type="button" className={styles.refresh} onClick={handleRefresh}>새로 시작하기</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Main;
