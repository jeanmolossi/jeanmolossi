import styled from "styled-components";

export const Container = styled.div`
    min-height: 10rem;
    display: flex;
    align-items: flex-end;
    padding: 1.25rem;

    color: ${({ theme }) => theme.lightGray};
    font-size: 0.825rem;
`
