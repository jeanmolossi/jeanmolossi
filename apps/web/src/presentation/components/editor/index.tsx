'use client';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useState } from 'react';
import rehypeHighlight from 'rehype-highlight';
import './editor.css';

const TOOLBAR = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    ['clean'],
];

interface EditorProps {
    name?: string;
    placeholder?: string;
}

export default function Editor({ name, placeholder }: EditorProps) {
    const [value, setValue] = useState('');
    const [q, setQ] = useState<Quill | null>(null);

    const wrapper = useCallback((editor: HTMLDivElement | null) => {
        if (typeof window === 'undefined') return;
        if (typeof document === 'undefined') return;
        if (!editor || !!q) return;

        const quill = new Quill(editor, {
            placeholder,
            theme: 'snow',
            modules: {
                syntax: { hljs: rehypeHighlight },
                toolbar: TOOLBAR,
            },
        });

        setQ(quill);
    }, []);

    const handleChange = useCallback(
        (_delta: unknown, _oldDelta: unknown, source: any) => {
            if (source !== 'user' || !q) return;
            setValue(q.getSemanticHTML());
        },
        [q],
    );

    useEffect(() => {
        if (!q) return;

        q.on('text-change', handleChange);
        return () => {
            q.off('text-change', handleChange);
        };
    }, [q, handleChange]);

    return (
        <div className='relative'>
            <div ref={wrapper} id="editor"></div>
            <textarea hidden value={value} name={name}></textarea>
        </div>
    );
}
