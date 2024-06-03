import { login } from '@/lib/actions/login';

export default function Page(props: { searchParams: { error: string } }) {
    const message = decodeURIComponent(props.searchParams.error);

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
                <input
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
