import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import ClickButton from "../Common/ClickButton";
import MyPageAxiosApi from "../../api/MyPageAxiosAPI";
import SelColor from "./SelColor";
import MyType from "./SelType";

const WorkAdd = ({ isMypage }) => {
  const navigate = useNavigate();

  const [contentId, setContentId] = useState(5);
  const [date, setDate] = useState("");
  const [myWkName, setMyWkName] = useState("");
  const [myPayType, setMyPayType] = useState(1);
  const [isHourly, setIsHourly] = useState(true);
  const [isCase, setIsCase] = useState(false);
  const [myWkMoney, setMyWkMoney] = useState("");
  const [myWkStart, setMyWkStart] = useState("");
  const [myWkEnd, setMyWkEnd] = useState("");
  const [myWkRest, setMyWkRest] = useState("");
  const [myWkCase, setMyWkCase] = useState("");
  const [myWkTax, setMyWkTax] = useState("");
  const [myWkPayday, setMyWkPayday] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleMyWkNameChange = (event) => {
    setMyWkName(event.target.value);
  };

  // 카테고리 값 가져오기
  const onChangeMyPayType = (selectedItem) => {
    setMyPayType(parseInt(selectedItem));

    switch (parseInt(selectedItem)) {
      case 1: // 시급
        setIsHourly(true);
        setIsCase(false);
        break;

      case 2: // 일급
        setIsHourly(false);
        setIsCase(false);
        break;

      case 3: // 월급
        setIsHourly(false);
        setIsCase(false);
        break;

      case 4: // 건별
        setIsHourly(false);
        setIsCase(true);
        break;
      default:
    }
  };

  const handleMyWkMoneyChange = (event) => {
    setMyWkMoney(event.target.value);
  };

  const handleMyWkStartChange = (event) => {
    setMyWkStart(event.target.value);
  };

  const handleMyWkEndChange = (event) => {
    setMyWkEnd(event.target.value);
  };

  const handleMyWkRestChange = (event) => {
    setMyWkRest(event.target.value);
  };

  const handleMyWkCaseChange = (event) => {
    setMyWkCase(event.target.value);
  };

  const handleMyWkTaxChange = (event) => {
    setMyWkTax(event.target.value);
  };

  const handleMyWkPaydayChange = (event) => {
    setMyWkPayday(event.target.value);
  };

  const handleContentIdChange = (id) => {
    setContentId(id);
  };

  const onCreateMyWork = async () => {
    try {
      const createMyWork = await MyPageAxiosApi.createMyWork({
        contentId: contentId.toString(),
        date,
        myWkName,
        myPayType,
        myWkMoney,
        myWkStart,
        myWkEnd,
        myWkRest,
        myWkCase,
        myWkTax,
        myWkPayday,
      });

      if (createMyWork.data === "근무를 성공적으로 생성했습니다.") {
        console.log("입력 성공");
        navigate("/mypage");
      } else {
        console.log("입력 실패");
        navigate("/mypage");
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <>
      <Container>
        <Title>근무 등록</Title>
        <BlockLine />

        <InputContainer>
          <div>
            {isMypage ? (
              <></>
            ) : (
              <>
                <p className="label">날짜</p>
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </>
            )}
          </div>
          <div>
            <p className="label">근무이름</p>
            <Input value={myWkName} onChange={handleMyWkNameChange} />
          </div>

          <p className="label">급여</p>
          <div>
            {/* <MyType value={myPayType.toString()} onChange={onChangeMyPayType} /> */}
            <MyType value={myPayType} onChange={onChangeMyPayType} />
            <Input value={myWkMoney} onChange={handleMyWkMoneyChange} />
            <p className="text">원</p>
          </div>

          {isHourly ? (
            <>
              <p className="label">근무시간</p>
              <div>
                <Input
                  type="time"
                  value={myWkStart}
                  onChange={handleMyWkStartChange}
                />
                <p className="label"> - </p>
                <Input
                  type="time"
                  value={myWkEnd}
                  onChange={handleMyWkEndChange}
                />
              </div>
              <div>
                <p className="label">휴게시간</p>
                <Input
                  type="number"
                  min="0"
                  value={myWkRest}
                  onChange={handleMyWkRestChange}
                />
                <p className="text">분</p>
              </div>
            </>
          ) : (
            <></>
          )}
          {isCase ? (
            <div>
              <p className="label">건 수</p>
              <Input value={myWkCase} onChange={handleMyWkCaseChange} />
              <p className="text">건</p>
            </div>
          ) : (
            <></>
          )}
          <div>
            <p className="label">세 금</p>
            <Input value={myWkTax} onChange={handleMyWkTaxChange} />
          </div>
          <div>
            <p className="label">급여일</p>
            <Input
              type="date"
              value={myWkPayday}
              onChange={handleMyWkPaydayChange}
            />
          </div>
          {/* <p className="label">color</p> */}
          <SelColor
            // value={myColor}
            contentId={contentId}
            onContentIdChange={handleContentIdChange}
          />
          {/* <SelColor value={defaultMyColor} onChange={handleMyColorChange} /> */}
        </InputContainer>
      </Container>
      <ButtonContainer>
        <ClickButton onClick={onCreateMyWork}>근무 등록</ClickButton>
      </ButtonContainer>
    </>
  );
};

export default WorkAdd;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 55%;
  border-top: none;
  border-left: none;
  color: lightgray;
  border-right: none;
  border-bottom: 1px solid lightgray;
  text-align: right;
  outline: none;
  background-color: rgba(255, 255, 255, 0);

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.menuColor};
    color: ${({ theme }) => theme.menuColor};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .label {
    width: ${({ width }) => width || "auto"};
    margin: 5px;
    margin-top: 10px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
  }
  .text {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    margin: 3px;
    margin-top: 9px;
    color: gray;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  flex-wrap: wrap;
  width: 200px;
  margin: 20px;

  div {
    display: flex;
    width: auto;
    flex-direction: row;
    margin: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
