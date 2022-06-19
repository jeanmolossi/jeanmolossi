import { formatDistanceToNow, isDate } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import slugify from 'slugify';
import { charmap } from '@/config/slugify/charmap';

declare global {
    interface String {
        toRelativeTime(): string;
        toSlug(): string;
    }
}

String.prototype.toRelativeTime = function () {
    const date = new Date(this.toString());

    if (!isDate(date)) {
        return this as string;
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: ptBr });
};

String.prototype.toSlug = function () {
    const self = this as string;

    slugify.extend(charmap);
    return slugify(self, {
        lower: true,
        strict: true,
        locale: 'pt',
    });
};

export {};
