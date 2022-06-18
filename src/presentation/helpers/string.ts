import { formatDistanceToNow, isDate } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

declare global {
    interface String {
        toRelativeTime(): String;
    }
}

String.prototype.toRelativeTime = function () {
    const date = new Date(this.toString());

    if (!isDate(date)) {
        return this;
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: ptBr });
};

export {};
