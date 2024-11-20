import { createInterface } from 'readline/promises';
import { format } from 'util';

const QUIT_CMD = 'quit';

function handleTimeout(cb: Function) {
    return function (err: any) {
        if (err.code === 'ABORT_ERR') {
            console.error('Tempo finalizado! Sem respostas...');
        }

        cb();
        return QUIT_CMD;
    };
}

type Question = {
    question: string;
    validOptions?: Record<string, string>;
    abortInvalidOption?: boolean;
};

export async function questions(questionsCfg: Question | Question[]) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answers: string[] = [];
    let singleResult = false;

    if (!Array.isArray(questionsCfg)) {
        singleResult = true;
        questionsCfg = [questionsCfg];
    }

    for await (let q of questionsCfg) {
        const { question, validOptions, abortInvalidOption } = q;

        const options = validOptions ? Object.entries(validOptions) : [];
        const promptOptions = options.map(([option, label]) => `${option} - ${label}`).join('\n\t');

        const message = format('%s\n\t%s\nSua resposta: ', question, promptOptions);

        const answer = await rl
            .question(message, { signal: AbortSignal.timeout(300_000) })
            .catch(handleTimeout(() => rl.close()));

        if (!validOptions) {
            answers.push(answer);
            continue;
        }

        const validOptsMap = new Map(Object.entries(validOptions));
        const isValidAnswer = validOptsMap.has(answer.toString().toLowerCase());

        if (!isValidAnswer) {
            if (abortInvalidOption) {
                rl.close();
                console.error('Opcao invalida!', answer);
                return [QUIT_CMD];
            }

            return questions(q);
        }

        const optAnswer = validOptsMap.get(answer.toString().toLowerCase())!;
        answers.push(optAnswer);
    }

    rl.close();

    if (singleResult) {
        return answers.at(0)!;
    }

    return answers;
}

export function close() {}
