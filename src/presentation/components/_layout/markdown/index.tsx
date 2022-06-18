import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { MarkdownProcessor } from '@/presentation/helpers';
import * as S from './styles';

export interface MarkdownProps {
    children?: string;
}

export const Markdown = ({ children: md = '' }: MarkdownProps) => {
    const parsedBody = useMemo(() => {
        const processor = new MarkdownProcessor(md)
        return processor
            .extractEmbed()
            .extractEmptyCodeBlock()
            .final()
    }, [md])

    return (
        <S.MarkdownWrapper>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeHighlight,
                    rehypeExternalLinks,
                ]}
                children={parsedBody}
            />
        </S.MarkdownWrapper>
    )
}

