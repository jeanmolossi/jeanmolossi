'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/presentation/components/ui/sheet";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../../ui/button";
import { items } from "./config";

export function MobileNavigation() {
    return (
        <div className="w-full inline-flex justify-between items-center p-4 fixed top-0 bg-background lg:hidden">
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
                            <Button asChild variant="ghost" size="lg" className="gap-2">
                                <Link
                                    href={href}
                                    as={as}
                                    key={i}
                                >
                                    <Icon className="h-6 w-6" />
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
