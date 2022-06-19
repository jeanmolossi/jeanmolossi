import styled from 'styled-components';
import { socialColors } from '@/presentation/styles';

export const SocialWrapper = styled.div`
    display: flex;
    column-gap: ${({ theme }) => theme.gutter.sm};
    align-items: center;
    font-size: 1.25rem;

    > a {
        --pos: 0;
        display: flex;

        &.github {
            --pos: -1px;
            color: ${socialColors.github};
        }

        &.twitter {
            color: ${socialColors.twitter};
        }

        &.linkedin {
            color: ${socialColors.linkedin};
        }

        &.youtube {
            --pos: 5px;
            color: ${socialColors.youtube};
        }

        &.telegram {
            color: ${socialColors.telegram};
        }

        &.instagram {
            color: ${socialColors.instagram};
        }

        &.withBgWhite {
            position: relative;
            z-index: 2;

            &::before {
                content: '';
                position: absolute;
                top: var(--pos);
                left: var(--pos);
                right: var(--pos);
                bottom: var(--pos);
                background-color: white;
                border-radius: 999px;
                z-index: -1;
            }
        }
    }
`;
