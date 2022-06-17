import styled from 'styled-components';

export const CanvasOverlay = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -999;
    background: black;

    > div {
        background-color: ${({ theme }) => theme.oxfordBlue};
    }
`;
