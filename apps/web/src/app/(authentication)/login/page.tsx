import { login } from '@/lib/actions/login';

export default function Page(props: { searchParams: { error: string } }) {
    const message =
        props.searchParams.error &&
        decodeURIComponent(props.searchParams.error);

    console.log(message);

    return (
        <div className="grid place-content-center w-full h-screen">
            <form
                action={login}
                className="flex flex-col gap-4 bg-muted p-6 rounded shadow-lg shadow-muted-dark/40"
            >
                {message && (
                    <div role="alert" className="text-center text-red-400">
                        {message}
                    </div>
                )}

                <label htmlFor="email">Digite seu email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="seu@email.com"
                    className="p-2 rounded"
                />

                <label htmlFor="password">Digite sua senha</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="S3nh4 Secre7A"
                    className="p-2 rounded"
                />

                <button type="submit" className="p-2 rounded bg-primary">
                    Acessar
                </button>
            </form>
        </div>
    );
}
