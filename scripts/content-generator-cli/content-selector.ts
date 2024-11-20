import { close, questions } from './quiz';

export async function contentType() {
    const option = await questions({
        question: 'Que tipo de conteudo quer gerar?',
        validOptions: {
            '1': 'Course',
            '2': 'Lesson',
            '3': 'Article',
        },
    });

    if (option === 'quit') {
        close();
        return '';
    }

    return option.toString();
}
