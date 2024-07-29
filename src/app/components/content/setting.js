'use client';
import { useState, useEffect } from "react";
import styles from "./setting.module.css";

const Setting = ({ setIsSetting, setShowModal }) => {
    const [itemsErrorMsg, setItemsErrorMsg] = useState(false);
    const [rankErrorMsg, setRankErrorMsg] = useState(false);
    const [itemsValue, setItemsValue] = useState(0);
    const [rankValue, setRankValue] = useState(0);
    const [rankInputObj, setRankInputObj] = useState({});

    const updateSettingInput = (e) => {
        const regexp = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = regexp;

        const { id, value } = e.target;

        if (id === "setting_items") {
            if (value > 500) {
                setItemsErrorMsg(true);
                setItemsValue(0);
            } else {
                setItemsValue(Number(value));
                setItemsErrorMsg(false);
            }
        } else {
            if (value > 10) {
                setRankErrorMsg(true);
                setRankValue(0);
            } else {
                setRankValue(Number(value));
                setRankErrorMsg(false);
            }
        }
    };

    const rankInput = (e) => {
        const { className, value } = e.target;
        const rankRespectivelyArr = [];
        for (let i = 0; i < value; i++) {

            let randomNumber = Math.floor(Math.random() * itemsValue + 1);
            if (rankRespectivelyArr.indexOf(randomNumber) === -1) {

                rankRespectivelyArr.push(randomNumber);
            } else {
                i--;
            }
        }

        setRankInputObj(prev => ({
            ...prev,
            [className]: rankRespectivelyArr
        }));

    };

    const renderRank = (idx) => {
        const rankArr = [];
        for (let i = 0; i < idx; i++) {
            rankArr.push(
                <div key={i}>
                    <span>{i + 1}등</span>
                    <input type="number" className={`rank_${i}`} onChange={rankInput} />
                </div>
            );
        }
        return rankArr;
    };

    const handleCreateBtn = () => {
        setIsSetting({
            items: itemsValue,
            rankValue: rankValue,
            ranks: Object.entries(rankInputObj).map(([key, value]) => ({ [key]: value }))
        });
        setShowModal(false);
    };

    return (
        <div className={styles.setting}>
            <div className={styles.custom_desc}>
                <h2>커스텀 방법</h2>
                <ul>
                    <li><span>뽑기 개수 와 상품 등수 및 당첨 개수를 커스텀 할 수 있습니다.</span></li>
                    <li><span>뽑기 개수는 최대 500개까지 생성할 수 있습니다.</span></li>
                    <li><span>상품 등수는 최대 10등까지 생성할 수 있습니다.</span></li>
                    <li><span>뽑기 개수와 당첨 개수가 일치하지 않으면 나머지는 자동으로 '꽝'으로 표시됩니다.</span></li>
                </ul>
            </div>
            <div className={styles.custom_set}>
                <div>
                    <span>뽑기 설정</span>
                    <input type="text" id="setting_items" placeholder="최대 500개" onChange={updateSettingInput} />
                </div>
                <p className={styles.error_msg}>{itemsErrorMsg ? "숫자 또는 500개 까지 생성 가능합니다." : ""}</p>
                <div>
                    <span>등수 설정</span>
                    <input type="text" id="setting_rank" placeholder="최대 10등" onChange={updateSettingInput} />
                </div>
                <p className={styles.error_msg}>{rankErrorMsg ? "숫자 또는 10등 까지 생성 가능합니다." : ""}</p>
            </div>
            <div className={styles.prize_set}>
                {renderRank(rankValue)}
            </div>
            <button type="button" id="create_btn" className={styles.create_btn} onClick={handleCreateBtn}>생성하기</button>
        </div>
    );
}

export default Setting;
