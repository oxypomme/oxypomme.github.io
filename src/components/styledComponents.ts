import styled from "@emotion/styled";

export const Separator = styled.div`
    border-bottom: 1px solid var(--background-light);
    width: 45%;
    margin: 15px auto 15px auto;
`;

export const HiddenList = styled.ul`
    list-style-type: none;
    padding: 0;

    & ul {
        padding: 0 20px;
    }

    & h4 {
        display: inline;
    }
`;

export const Card = styled.div`
    text-align: left;
    width: 700px;
    margin: 20px;
    padding: 10px 20px;
    background-color: var(--accent2-transparent);
    border-radius: 5px;
    transition: background-color .25s;

    &:hover{
        background-color: var(--accent2-dark-transparent);
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

export const WaitingForData = styled.div<{ length?: number }>`
    background-color: #00000030;
    color: #00000000;
    border-radius: 2px;
    width: ${({ length }) => (length || 8) * 8 + "px"};
    height: 31px;
    display: inline-block;
    margin: 0 2px;
    &::before {
        content: "_";
    }
`;