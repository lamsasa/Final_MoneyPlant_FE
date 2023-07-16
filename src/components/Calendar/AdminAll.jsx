import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import AdminContents from "./AdminContents";
import AdminLedger from "./AdminLedger";
import Tag from "../MyPage/Tag";
import Account from "./Account";
import LedgerAxiosApi from "../../api/LedgerAxiosAPI";
import CalendarAxiosApi from "../../api/CalendarAxiosAPI";

const AdminAll = ({ setValue }) => {
  const [selectTodaySc, setSelectTodaySc] = useState([]);
  const [selectTodayWork, setSelectTodayWork] = useState([]);
  const [selectTodayExpense, setSelectTodayExpense] = useState([]);
  const [selectTodayIncome, setSelectTodayIncome] = useState([]);

  useEffect(() => {
    const nowDate = formatDate(setValue);

    function formatDate(date) {
      const formattedDate = new Date(date);
      formattedDate.setDate(formattedDate.getDate() + 1);
      return formattedDate.toISOString().split("T")[0];
    }

    const getTodaySchedule = async () => {
      try {
        const rsp = await CalendarAxiosApi.getTodaySchedule(nowDate);
        if (rsp.status === 200) setSelectTodaySc(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodaySchedule();

    const getTodayWork = async () => {
      try {
        const rsp = await CalendarAxiosApi.getTodayWork(nowDate);
        if (rsp.status === 200) setSelectTodayWork(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayWork();

    const getTodayExpense = async () => {
      try {
        const rsp = await LedgerAxiosApi.getTodayExpense(nowDate);
        if (rsp.status === 200) setSelectTodayExpense(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayExpense();

    const getTodayIncome = async () => {
      try {
        const rsp = await LedgerAxiosApi.getTodayIncome(nowDate);
        if (rsp.status === 200) setSelectTodayIncome(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodayIncome();
  }, [setValue]);

  return (
    <AdminAllContainer>
      <BlockLine />
      {/* 일정 */}
      <div className="block">
        <div className="title">일정</div>
        <AdminContents isBasic={true} setValue={setValue} />
      </div>
      <div className="tagBox">

              <Tag color={1} detail={"저녁약속"} />
              <Tag color={3} detail={"애견카페"} />

      </div>

      {/* <Tag color={"red"} detail={"tes"}></Tag>
        <Tag color={"red"} detail={"test"}></Tag>
        <Tag color={"red"} detail={"test"}></Tag>
        <Tag color={"red"} detail={"test"}></Tag> */}

      {/* 근무 */}
      <div className="block">
        <div className="title">근무</div>
        <AdminContents isBasic={false} setValue={setValue} />
      </div>
      <div className="tagBox">
        <WorkContainer>
          <Tag width={"70%"} color={6} detail={"수락산공차"} />
          <p className="time">
            {"23:11"} ~ {"23:15"}
          </p>
          <p className="money">{120000}원</p>
        </WorkContainer>
        <WorkContainer>
          <Tag width={"70%"}color={6} detail={"오픈알바"} />
          <p className="time">
            {"23:11"} ~ {"23:15"}
          </p>
          <p className="money">{12000000}원</p>
        </WorkContainer>
      </div>

      <BlockLine />
      {/* 가계부 */}

      <div className="block">
        <div className="title">수입/지출</div>
        <AdminLedger setValue={setValue} />
      </div>
      <div className="tagBox">
        {/* {selectTodayExpense.length === 0 && selectTodayIncome.length === 0 ? (
          <p className="none">수입/지출 내역이 없습니다.</p>
        ) : (
          <>
            {selectTodayExpense.map((data, index) => ( */}
        <Account
          account={"지출"}
          // key={index}
          amount={"3000"}
          content={"123123"}
          categoryName={"식비"}
        />
        <Account
          account={"수입"}
          // key={index}
          amount={"30000"}
          content={"123123"}
          categoryName={"용돈"}
        />
        {/* //     ))}
        //     {selectTodayIncome.map((data, index) => (
        //       <Account
        //         account={"수입"}
        //         key={index}
        //         amount={data.incomeAmount}
        //         content={data.incomeContent}
        //         categoryName={data.categoryIncomeName}
        //       />
        //     ))}
        //   </>
        // )} */}
      </div>
    </AdminAllContainer>
  );
};

export default AdminAll;

const AdminAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .none {
    margin-left: 20px;
    font-size: 12px;
  }
  .border {
    border-bottom: 1px solid black;
    width: 95%;
    margin-left: 3px;
    padding-right: 50px;
  }
  .block {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .title {
    font-size: 15px;
    width: 100px;
    margin-left: 10px;
  }
  .tagBox {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    margin-bottom: 30px;
    /* width: 95%; */
  }
  .accountBox {
    margin-bottom: 20px;
    padding-right: 10px;
  }
`;

const WorkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 12px;
  width: 100%;

  .time {
    margin-left: 20%;
    margin-right: 20%;
    width: 100%;
  }
  .money {
    width: 85%;
    margin-right: 30px;
    text-align: right;
  }
`;
