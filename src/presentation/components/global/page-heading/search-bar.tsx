'use client'

import { Button } from "@/presentation/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader
} from "@/presentation/components/ui/dialog"
import { Input } from "@/presentation/components/ui/input"
import { Command } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react"

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    deboundeDelayMs?: number
}

const SearchBar = React.forwardRef<
    HTMLInputElement,
    SearchBarProps
>(({
    children: _children,
    placeholder = 'Pesquise',
    deboundeDelayMs = 700,
    defaultValue,
    ...props
}, ref) => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpen, setIsOpen] = useState(false)

    const debounced = useRef<ReturnType<typeof setTimeout>>()

    const onSearch = (term: string): URLSearchParams => {
        const params = new URLSearchParams(searchParams);
        if (term) params.set('search', term);
        else params.delete('search')

        return params;
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const params = onSearch(e.target.value);

        clearTimeout(debounced.current)

        debounced.current = setTimeout(() => {
            replace(`${pathname}?${params.toString()}`)
        }, deboundeDelayMs)
    }

    useEffect(() => {
        function onSearchStart(ev: KeyboardEvent) {
            if (ev.code === 'KeyK' && ev.ctrlKey) {
                ev.preventDefault();
                ev.stopPropagation()
                setIsOpen(true)
                return;
            }

            if (ev.code === 'Escape') {
                setIsOpen(false)
                return;
            }
        }

        window.addEventListener('keydown', onSearchStart)

        return () => {
            window.removeEventListener('keydown', onSearchStart)
        }
    }, [])

    return (
        <div className="inline-flex flex-col justify-center gap-1 py-4">
            <Input
                ref={ref}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={searchParams?.get('search') || defaultValue }
                {...props}
            />

            <small className="hidden lg:inline-flex items-center justify-end gap-2 text-xs text-muted-foreground">
                Pressione
                <span className="inline-flex items-center gap-1"><Command className="w-3 h-3" />+ K</span>
            </small>

            <Dialog open={isOpen} onOpenChange={console.log}>
                <DialogContent>
                    <DialogHeader>Faça sua busca</DialogHeader>
                    <DialogDescription>{placeholder}</DialogDescription>

                    <div>
                        <Input
                            onChange={onChange}
                            {...props}
                        />
                    </div>

                    <DialogFooter className="items-center">
                        <span className="text-sm text-muted-foreground">Pressione</span>
                        <span>Esc</span>
                        <span className="text-sm text-muted-foreground">ou</span>
                        <DialogClose asChild>
                            <Button variant="destructive">Fechar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar

export const SearchbarContainer = () => {}
