import Link from "next/link";
import { RenderIf } from "@/presentation/helpers";
import styles from './styles.module.css'

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
        <div className={styles.pagination_wrapper}>
            <Link href={{
                pathname: resource,
                query: { page: prev_page }
            }}>
                <RenderIf condition={hasPrevPage}>
                    <span className={styles.page_link}>&lt; Página anterior</span>
                </RenderIf>
            </Link>

            <Link href={{
                pathname: resource,
                query: { page: next_page }
            }}>
                <RenderIf condition={hasNextPage}>
                    <span className={[styles.page_link, styles.next].join(' ')}>Próxima página &gt;</span>
                </RenderIf>
            </Link>
        </div>
    )
}

