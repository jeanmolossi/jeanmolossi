import Editor from '@/presentation/components/editor';
import { Button, Input } from '@jeanmolossi/ui';

export default function Page() {
    return (
        <form className="p-4 flex flex-col gap-6">
            <h1>Publique um novo artigo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Titulo" />
                <Input placeholder="Subtitulo" />
            </div>

            <div className="min-h-20 border border-primary-muted rounded p-2">
                img
            </div>

            <div className="border border-primary-muted rounded">
                <Editor />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Tempo de leitura" type="number" />
                <Input placeholder="Tags" />
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="secondary">Salvar</Button>
                <Button>Publicar</Button>
            </div>
        </form>
    );
}
