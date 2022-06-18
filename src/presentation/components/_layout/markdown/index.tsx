import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { MarkdownProcessor } from '@/presentation/helpers';
import * as S from './styles';

interface MarkdownProps {
    children?: string;
}

export const Markdown = ({ children = '' }: MarkdownProps) => {
    const parsedBody = useMemo(() => {
        const processor = new MarkdownProcessor(children)
        return processor
            .extractEmbed()
            .extractEmptyCodeBlock()
            .final()
    }, [children])

    return (
        <S.MarkdownWrapper>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeExternalLinks,
                    rehypeHighlight
                ]}
            >
                {parsedBody}
            </ReactMarkdown>
        </S.MarkdownWrapper>
    )
}

