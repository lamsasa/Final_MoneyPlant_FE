import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import Container from "../components/Common/Container";
import Box from "../components/Common/Box";
import TagBox from "../components/MyPage/TagBox";
import useViewport from "../hooks/viewportHook";
import Tag from "../components/MyPage/Tag";
import MyPageAxiosApi from "../api/MyPageAxiosAPI";

const Mypage = () => {
  const { isMobile } = useViewport();

  const [myPageList, setMyPageList] = useState([]);

  // const [value, onChange] = useState(new Date());
  // const {userId} = useContext(LoginContext);

  useEffect(() => {
    const getMyPageList = async () => {
      try {
        const rsp = await MyPageAxiosApi.getMyPageList();
        if (rsp.status === 200) setMyPageList(rsp.data);
        setMyPageList(rsp.data);
        console.log("마이페이지 list 조회");
      } catch (error) {
        console.error("Request Error:", error);
      }
    };
    getMyPageList();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Box titleMargin={"30px"}>
          <p className="title">간편 입력</p>

          <Display isMobile={isMobile}>
            <TagBox tag={"일정"}>
              <Tag color={1} detail={"졸려죽겠네"} width={"20%"} />
            </TagBox>

            <TagBox tag={"근무"}>
              <Tag color={6} detail={"졸려죽겠네요"}width={"25%"} />
            </TagBox>
          </Display>
        </Box>
      </Container>
    </>
  );
};

export default Mypage;

const Display = styled.div`
  display: ${(props) => (props.isMobile ? "block" : "flex")};
`;
