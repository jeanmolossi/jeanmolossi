import { css } from 'styled-components';

export const backdrop = css`
    padding: ${({ theme }) => theme.gutter.xs};
    margin: ${({ theme }) => theme.gutter.xs} 0;

    border-radius: ${({ theme }) => theme.radii.xs};
    background-color:  ${({ theme }) => theme.darkGray};
`;
