interface HeaderProps {
    title: string;
    role: string;
    period: {
        start: string;
        end: string;
    }
}

export default function Header({ title, role, period }: HeaderProps) {
    return (
        <header className="mb-4">
            <h1 className="text-3xl">{title} | {role}</h1>
            <small className="text-gray-400">De {period.start} à {period.end}</small>
        </header>
    )
}
