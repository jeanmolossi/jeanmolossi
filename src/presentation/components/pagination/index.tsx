import Link from "next/link";
import { RenderIf } from "@/presentation/helpers";
import styled from "styled-components";

interface PaginationProps {
    resource: string;
    next_page?: string | null;
    prev_page?: string | null;
}

export const Pagination = ({
    resource = '',
    next_page,
    prev_page,
}: PaginationProps) => {
    const hasNextPage = !!next_page;
    const hasPrevPage = !!prev_page

    return (
        <PaginationWrapper>
            <Link href={{
                pathname: resource,
                query: { page: prev_page }
            }}>
                <RenderIf condition={hasPrevPage}>
                    <PageLink>&lt; Página anterior</PageLink>
                </RenderIf>
            </Link>

            <Link href={{
                pathname: resource,
                query: { page: next_page }
            }}>
                <RenderIf condition={hasNextPage}>
                    <PageLink className="next">Próxima página &gt;</PageLink>
                </RenderIf>
            </Link>
        </PaginationWrapper>
    )
}

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.gutter.md} 0;
    margin: ${({ theme }) => theme.gutter.md} 0;

    @media (max-width: 375px) {
        flex-direction: column;
        justify-content: initial;
        row-gap: ${({ theme }) => theme.gutter.md};
    }
`

const PageLink = styled.span`
    display: block;
    padding: ${({ theme }) => theme.gutter.md};
    background-color: ${({ theme }) => theme.aqueBlue};
    color: ${({ theme }) => theme.darkGray};
    border-radius: ${({ theme }) => theme.radii.xs};

    &.next{
        text-align: right;
    }
`
