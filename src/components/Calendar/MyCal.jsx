import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import useViewport from "../../hooks/viewportHook";
import Modal from "../Common/Modal";
import AdminAll from "./AdminAll";
import { ReactComponent as Right } from "../../assets/right.svg";
import { ReactComponent as Left } from "../../assets/left.svg";
import CalenderAPI from "../../api/CalendarAPI";

// 캘린더 API 적용
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

// import SMSAdd from "./SMSAdd";
// import Box from '../Common/Box';

const MYCalendar = forwardRef(({ isBasic }, ref) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { isMobile } = useViewport();
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const apiKey = process.env.REACT_APP_CAL_API_KEY;

  const curDate = new Date();
  const [value, setValue] = useState(curDate);

  // value가 변경될 때마다 모달 창 열기
  useEffect(() => {
    if (value !== curDate) {
      openModal();
    }
  }, [value]);

  // //투데이 버튼... value값 자체가 옮겨가진 않음
  // const handleReturnToday = () => {
  //   const today = new Date();
  //   setValue(today);
  // };

  // // 컴포넌트에 Useref사용 설정
  // const calendarRef = useRef();

  // //캘린더 라이브러리 컴포넌트에서 ref 등록
  // <Calendar ref={calendarRef} />;

  // const onClickTodayHandler = () => {
  //   const calendar = calendarRef.current;
  //   const firstDayOfTodaysMonth = moment().date(1).toDate();
  //   calendar.setActiveStartDate(firstDayOfTodaysMonth);
  // };

  const handleNextDay = () => {
    const nextDay = moment(value).add(1, "day").toDate();
    setValue(nextDay);
  };
  const handleBeforeDay = () => {
    const beforeDay = moment(value).add(-1, "day").toDate();
    setValue(beforeDay);
  };
  // api 연결
  const [expenseDates, setExpenseDates] = useState([]);
  const [expenseAmounts, setExpenseAmounts] = useState([]);
  const [incomeDates, setIncomeDates] = useState([]);
  const [incomeAmounts, setIncomeAmounts] = useState([]);

  //리스트 사용 확인
  // const [dailyExpenseList, setDailyExpenseList] = useState([]);
  // const [dailyIncomeList, setDailyIncomeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CalenderAPI.getCalendarView();
        const { expenseDates, expenseAmounts, incomeDates, incomeAmounts } =
          // const { expenseDates, expenseAmounts, incomeDates, incomeAmounts, dailyExpenseList, dailyIncomeList } =
          response;
        setExpenseDates(expenseDates);
        setExpenseAmounts(expenseAmounts);
        setIncomeDates(incomeDates);
        setIncomeAmounts(incomeAmounts);
        // setDailyExpenseList(dailyExpenseList);
        // setDailyIncomeList(dailyIncomeList);

        // expenseDates, expenseAmounts, incomeDates, incomeAmounts 사용
        console.log("지출 날짜", expenseDates);
        console.log("지출 금액", expenseAmounts);
        console.log("수입 날짜", incomeDates);
        console.log("수입 금액", incomeAmounts);
        // console.log("지출 리스트", dailyExpenseList);
        // console.log("수입 리스트", dailyIncomeList);

        // 필요한 작업 수행
      } catch (error) {
        console.error("조회 실패", error);
      }
    };

    fetchData();
  }, []);

  // 컨텐츠 날짜 리스트

  const scList = [
    "2023-06-04",
    "2023-06-05",
    "2023-06-10",
    "2023-06-11",
    "2023-06-17",
    "2023-06-30",
  ];

  const workList = [
    "2023-06-03",
    "2023-06-04",
    "2023-06-10",
    "2023-06-11",
    "2023-06-17",
    "2023-06-18",
    "2023-06-24",
    "2023-06-25",
  ];

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: any) => {
    // 해당 날짜에 추가할 컨텐츠의 배열
    const contentBasic = [];
    const contentSchedule = [];
    const contentWork = [];

    // date가 리스트의 날짜와 일치하면 해당 컨텐츠 추가

    // 수입
    incomeDates.forEach((day, index) => {
      if (day === moment(date).format("YYYY-MM-DD")) {
        const amount = incomeAmounts[index];

        contentBasic.push(
          <React.Fragment key={index}>
            {isBasic ? (
              <p className="income-text">+{amount}원</p>
            ) : (
              <div className="dot-income"></div>
            )}
          </React.Fragment>
        );
      }
    });

    // 지출
    expenseDates.forEach((day, index) => {
      if (day === moment(date).format("YYYY-MM-DD")) {
        const amount = expenseAmounts[index];

        contentBasic.push(
          <React.Fragment key={index}>
            {isBasic ? (
              <p className="expense-text">-{amount}원</p>
            ) : (
              <div className="dot-expense"></div>
            )}
          </React.Fragment>
        );
      }
    });

    // 일정
    if (scList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contentSchedule.push(
        <>
          {isBasic ? (
            <div className="dot-schedule"></div>
          ) : (
            <div className="box-schedule">
              <p>일정</p>
            </div>
          )}
        </>
      );
    }

    // 근무
    if (workList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contentWork.push(
        <>
          {isBasic ? (
            <div className="dot-work"></div>
          ) : (
            <div className="box-work">
              <p>근무</p>
            </div>
          )}
        </>
      );
    }
    return (
      <div className="contents">
        {isBasic ? (
          <>
            <div className="content-row">
              <div className="content-sc">{contentSchedule}</div>
              <div className="content-work">{contentWork}</div>
            </div>
            <div className="content-column">{contentBasic}</div>
          </>
        ) : (
          <>
            <div className="content-row">{contentBasic}</div>
            <div className="content-column">
              <div className="content-sc">{contentSchedule}</div>
              <div className="content-work">{contentWork}</div>
            </div>
          </>
        )}
      </div>
    ); // 각 날짜마다 해당 요소가 들어감
  };

  return (
    <CalendarContainer isMobile={isMobile}>
      <div className="calendar_Main">
        {isBasic ? (
          <Calendar
            ref={ref}
            calendarType="US" // 요일을 일요일부터 시작하도록 설정
            locale="en" // 달력 설정 언어
            onChange={setValue}
            value={value}
            formatMonthYear={(locale, value) =>
              value.toLocaleDateString("ko", { year: "numeric", month: "long" })
            }
            // next2Label={null}
            // prev2Label={null}
            tileContent={addContent}
            isBasic={true}
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month"
          />
        ) : (
          <Calendar
            ref={ref}
            calendarType="US" // 요일을 일요일부터 시작하도록 설정
            locale="en" // 달력 설정 언어
            onChange={setValue}
            value={value}
            formatMonthYear={(locale, value) =>
              value.toLocaleDateString("ko", { year: "numeric", month: "long" })
            }
            // onClickDay={dayIn}
            // returnValue="range"
            tileContent={addContent}
            isBasic={false}
            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            maxDetail="month"
          />
        )}

        <div>
          {isBasic
            ? modalOpen && (
                <Modal open={modalOpen} close={closeModal} width={"300px"}>
                  <DayContainer>
                    <DayButton onClick={handleBeforeDay}>
                      <Left />
                    </DayButton>
                    <SelectDay>
                      {moment(value).format("YYYY년 MM월 DD일")}
                    </SelectDay>
                    <DayButton onClick={handleNextDay}>
                      <Right />
                    </DayButton>
                  </DayContainer>
                  <AdminAll value={setValue} />
                </Modal>
              )
            : modalOpen && (
                <Modal
                  open={modalOpen}
                  close={closeModal}
                  width={"300px"}
                ></Modal>
              )}
        </div>
      </div>
    </CalendarContainer>
  );
});
export default MYCalendar;

const CalendarContainer = styled.div`
  padding-bottom: 30px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  .calendar-tab {
    display: ${(props) => (props.isMobile ? "none" : "flex")};
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin: 20px 10px 0 20px;
    padding: 10px;
    width: 300px;
    height: auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    line-height: 1.125em;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .select-day {
    margin: 10px;
  }

  .contents {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .calendar_Main {
    display: flex;
  }

  .content-row {
    display: flex;
    flex-direction: row;
    margin: 7px;
  }

  .content-colunm {
    display: flex;
    flex-direction: column;
  }

  .content-sc,
  .content-work {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .dot-income,
  .dot-expense,
  .dot-schedule,
  .dot-work {
    margin: 1px;
    width: ${(props) => (props.isMobile ? "0.5em" : "0.6em")};
    height: ${(props) => (props.isMobile ? "0.5em" : "0.6em")};
    border-radius: 50%;
    /* margin-top: 55px; */
  }

  .income-text {
    color: #3fcea5;
  }

  .expense-text {
    color: #ff005c;
  }

  .dot-income {
    background-color: #3fcea5;
  }

  .dot-expense {
    background-color: #ff005c;
  }

  .income-text,
  .expense-text {
    font-size: 0.8em;
  }

  .dot-schedule,
  .box-schedule {
    background-color: #329d9c;
  }

  .dot-work,
  .box-work {
    background-color: #bdbdbd;
  }

  .box-schedule,
  .box-work {
    width: 2em;
    height: 1.2em;
    border-radius: 10%;
    margin: 1px;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    p {
      color: #fff;
      font-size: 0.6em;
      padding-bottom: 1px;
    }
  }

  // react-calendar.css
  .react-calendar {
    margin: 10px;
    width: 90%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__navigation button {
    color: #222;
    font-weight: bold;
    width: auto;
    height: auto;
    background: none;
    /* font-size: 16px; */
    /* margin-top: 15px; */
  }

  .react-calendar__navigation__arrow {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__navigation__label {
    font-size: 20px;
  }

  .react-calendar__viewContainer {
    margin-bottom: 15px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.bgColor};
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    /* background: ${({ theme }) => theme.bgColor}; */
    background: ${({ theme }) => theme.todayColor};
    border-radius: 6px;
    font-weight: bold;
    color: #222;
  }

  // 오늘 날짜 선택 시
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};

    border-radius: 6px;
    font-weight: bold;
    color: #fff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${({ theme }) => theme.todayColor};
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f0f0f0;
  }

  .react-calendar__tile--range {
    background: ${({ theme }) => theme.todayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  // react-calendar.css
  .react-calendar {
    margin: 10px;
    width: 85%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__navigation button {
    color: ${({ theme }) => theme.menuColor};
    font-weight: bold;
    width: auto;
    height: auto;
    background: none;
    /* font-size: 16px; */
    /* margin-top: 15px; */
  }

  .react-calendar__navigation__arrow {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__navigation__label__labelText {
    color: ${({ theme }) => theme.menuColor};
    font-size: 17px;
  }

  .react-calendar__viewContainer {
    margin-bottom: 15px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.bgColor};
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    /* background: ${({ theme }) => theme.bgColor}; */
    background: ${({ theme }) => theme.todayColor};
    border-radius: 6px;
    font-weight: bold;
    color: #222;
  }

  // 오늘 날짜 선택 시
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};

    border-radius: 6px;
    font-weight: bold;
    color: #fff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${({ theme }) => theme.todayColor};
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f0f0f0;
  }

  .react-calendar__tile--range {
    background: ${({ theme }) => theme.todayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  /* .react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: top;
  font-size: 0.75em;
  font-weight: bold;
} */

  /* .react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
} */

  .react-calendar__tile {
    text-align: center;
    padding: 20px;
    height: ${(props) => (props.isMobile ? "85px" : "100px")};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.menuColor};
  }

  .react-calendar__month-view__weekdays {
    font-size: 1.2em;
  }

  /* 해당 월의 날짜가 아니면 투명도 0.5 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
`;

const SelectDay = styled.div`
  font-size: 18px;
  margin-right: 10px;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const DayButton = styled.button`
  border-radius: 15%;
  width: 30px;
  height: 30px;
  background-color: #ffffff00;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.menuBgColor};
  }
  > svg {
    fill: ${({ theme }) => theme.budgetButton};
  }
`;
