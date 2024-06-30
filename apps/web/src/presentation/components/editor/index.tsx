'use client';

import { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import rehypeHighlight from 'rehype-highlight';
import 'quill/dist/quill.snow.css';

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

    const wrapper = useCallback(async (editor: HTMLDivElement | null) => {
        if (typeof window === 'undefined') return;
        if (!editor) return;
        if (!document) return;

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
        <div>
            <div ref={wrapper} id="editor"></div>

            <textarea hidden value={value} name={name}></textarea>
        </div>
    );
}
