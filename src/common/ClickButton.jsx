import styled from 'styled-components';


const ClickButton = ({width, height}) => {
    const ClickButtonStyled = styled.button`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0 16px;

        width: ${props => props.width || '128px'};
        height: ${props => props.height || '40px'};

        background: linear-gradient(100deg, rgba(66, 230, 149, 0.7) 3.56%, rgba(59, 178, 184, 0.7) 96.4%);
        box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        border: none;
        cursor: pointer;

        color: #FFFFFF;

        &:hover {
            background: linear-gradient(100deg, rgba(66, 230, 149, 1) 3.56%, rgba(59, 178, 184, 1) 96.4%);
        }
        `;
        return <ClickButtonStyled width={width} height={height}/>;
    };

export default ClickButton;