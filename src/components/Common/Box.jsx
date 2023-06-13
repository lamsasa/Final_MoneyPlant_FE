import styled from "styled-components";
const Box = ({children, height}) => {
        return <BoxStyle height={height}>{children}</BoxStyle>;
    };
export default Box;

const BoxStyle = styled.div`
    width:80%;
    margin:0 auto;
    margin-bottom:20px;
    height: ${({ height }) => height || ""};
    background-color:${({theme}) => theme.bgColor};
    box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    .content {
        display:flex;
        justify-content:space-between;
        padding: 20px;
    }
    .title{
        font-style: normal;
        font-weight: bolder;
        font-size: 18px;
    }

`
