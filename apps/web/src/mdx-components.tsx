// @ts-nocheck
import type { MDXComponents } from 'mdx/types';
import Anchor from './ui/mdx-components/anchor';
import Heading from './ui/mdx-components/heading';
import Img from './ui/mdx-components/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: Heading.H1,
        h2: Heading.H2,
        h3: Heading.H3,
        h4: Heading.H4,
        h5: Heading.H5,
        h6: Heading.H6,
        a: Anchor,
        img: Img,
        ...components,
    };
}
