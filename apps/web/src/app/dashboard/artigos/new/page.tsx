import ImageUploader from '@/app/components/_forms/image-uploader';
import Editor from '@/presentation/components/editor';
import { Button, Input } from '@jeanmolossi/ui';
import { submit } from './action';

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
    const searchParams = await props.searchParams;
    const error = searchParams.error;

    return (
        <form action={submit} className="p-4 flex flex-col gap-6">
            {error && (
                <p aria-live='polite' className='text-red-500'>
                    {error}
                </p>
            )}

            <h1 className='text-2xl'>Publique um novo artigo</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Input name="title" placeholder="Titulo" />
                <Input name="subtitle" placeholder="Subtitulo" />
            </div>

            <ImageUploader name="cover" />

            <div className="border border-primary-muted rounded">
                <Editor name='article' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="read_time" placeholder="Tempo de leitura" type="number" />
                <Input name="tags" placeholder="Tags" />
            </div>

            <div className="flex justify-end gap-4">
                <Button name='save' variant="secondary" value="save">Salvar</Button>
                <Button name='save' value="publish">Publicar</Button>
            </div>
        </form>
    );
}

export const dynamic = 'force-dynamic'
