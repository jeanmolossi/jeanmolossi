import { formatDuration as formatDurationFns } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const FORMAT = ['hours', 'minutes'];
const DELIMITER = ' e ';

export function formatDuration(durationTotal: number) {
    if (!durationTotal) {
        return `Não definido`;
    }

    if (durationTotal < 60) {
        return formatDurationFns(
            { minutes: durationTotal },
            { format: FORMAT, locale: ptBR, delimiter: DELIMITER },
        );
    }

    const minutes = durationTotal % 60;
    const hours = Math.floor(durationTotal / 60);

    return formatDurationFns(
        { hours, minutes },
        { format: FORMAT, locale: ptBR, delimiter: DELIMITER },
    );
}
