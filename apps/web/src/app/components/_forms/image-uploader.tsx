'use client';

import { Button } from '@jeanmolossi/ui';
import { CloudUpload, XCircle } from 'lucide-react';
import { ChangeEventHandler, useCallback, useRef, useState } from 'react';

type Allowed = 'jpg' | 'jpeg' | 'png' | 'webp'
type Mime = `image/${Allowed}`

interface ImageUploaderProps {
    name: string;
    /** @default 2.048 - `2MB` */
    maxSizeInMB?: number;
    mimeTypes?: Mime[];
    onChange?: (file: File) => void;
}

const DEFAULT_MIME_TYPES: Mime[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export default function ImageUploader({
    name,
    maxSizeInMB = 2.048,
    mimeTypes = DEFAULT_MIME_TYPES,
    onChange: onChangeProp,
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [invalid, setInvalid] = useState<true | undefined>(undefined)
    const [preview, setPreview] = useState('')

    const handleClearInput = useCallback(() => {
        setPreview('')
        onChangeProp?.(undefined!)
        setInvalid(undefined)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [])

    const onChange: ChangeEventHandler<HTMLInputElement>  = useCallback((event) => {
        if (event.target.files?.length === 0) {
            if (!preview) {
                setInvalid(true)
            }

            return
        }

        const file = event.target.files?.[0]
        if (!file) {
            if (!preview) {
                setInvalid(true)
            }

            return;
        }

        const size = file.size / (1024 * 1024)
        if (size > maxSizeInMB) {
            setInvalid(true);
            return;
        }

        const blob = URL.createObjectURL(file);
        setPreview(blob)
        setInvalid(undefined)
        onChangeProp?.(file)
    }, [preview, invalid])

    return (
        <div className='flex flex-col gap-2'>
            <label className='min-h-20 border border-dashed border-primary-muted group/upload hover:border-primary transition-all rounded p-2 grid data-[invalid]:border-red-700' data-invalid={invalid}>
                <div className='grid place-content-center place-items-center gap-4 p-4'>
                    <CloudUpload className='w-10 h-10 group-hover/upload:text-primary data-[invalid]:group-hover/upload:text-red-700 transition-all' data-invalid={invalid} />

                    <Button asChild variant={'secondary'}>
                        <span>Escolher capa</span>
                    </Button>
                </div>

                <input name={name} ref={inputRef} type='file' accept={mimeTypes.join(',')} multiple={false} hidden onChange={onChange} />
            </label>

            {invalid && (
                <span className='text-red-500' role="alert">A imagem deve ter até {maxSizeInMB.toFixed(0)}MB</span>
            )}

            {preview && (
                <div className='flex gap-4 py-4 w-full flex-wrap'>
                    <Miniature preview={preview} handleClearInput={handleClearInput} />
                </div>
            )}
        </div>
    )
}

function Miniature({ preview, handleClearInput }: { preview: string; handleClearInput(): void }) {
    return (
        <div className='relative'>
            <img src={preview} className='rounded w-16 h-16 object-cover' />
            <button onClick={handleClearInput} className='absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-red-100 rounded-full bg-red-500 p-0 hover:p-1 transition-all'>
                <XCircle className='w-5 h-5' />
            </button>
        </div>
    )
}
