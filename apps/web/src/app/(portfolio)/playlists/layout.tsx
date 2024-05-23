import Container from "@/presentation/components/_layout/container";
import React from "react";

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
