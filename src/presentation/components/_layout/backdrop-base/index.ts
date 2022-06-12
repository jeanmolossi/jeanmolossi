import { css } from 'styled-components';

export const backdrop = css`
    padding: ${({ theme }) => theme.gutter.xs};
    margin: ${({ theme }) => theme.gutter.xs} 0;

    backdrop-filter: blur(0.5rem);
    border-radius: ${({ theme }) => theme.radii.xs};
`;
