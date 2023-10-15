import React from "react"
import Container from "@/app/components/_layout/container";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Container className="my-4">
            {children}
        </Container>
    )
}
