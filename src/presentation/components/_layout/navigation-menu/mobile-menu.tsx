'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/presentation/components/ui/sheet";
import { X } from "lucide-react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../../ui/button";
import { items } from "./config";
import { ToggleTheme } from "./toggle-theme";

export function MobileNavigation() {
    return (
        <div className="w-full inline-flex justify-between items-center p-4 fixed top-0 bg-background lg:hidden z-10">
            <Link href="/" className="font-semibold">Jean Molossi</Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <GiHamburgerMenu />
                    </Button>
                </SheetTrigger>

                <SheetContent className="w-full lg:hidden">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <div className="w-full flex flex-col items-stretch gap-6 mt-10">
                        {items.map(({ href, as, label, icon: Icon }, i) => (
                            <Button asChild variant="ghost" size="lg" className="gap-2" key={i}>
                                <Link
                                    href={href}
                                    as={as}
                                >
                                    <Icon className="h-6 w-6" />
                                    {label}
                                </Link>
                            </Button>
                        ))}

                    </div>

                    <SheetFooter className="mt-8">
                        <div className="flex flex-col gap-4">
                            <div className="inline-flex items-center justify-end gap-4">
                                Alternar tema
                                <ToggleTheme />
                            </div>

                            <div className="inline-flex items-center justify-end gap-4">
                                Fechar
                                <SheetClose><X /></SheetClose>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
