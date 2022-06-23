import { formatDistanceToNow, isDate } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import slugify from 'slugify';
import { charmap } from '@/config/slugify/charmap';

declare global {
    interface String {
        toRelativeTime(): string;
        toSlug(): string;
        nlToBr(): string;
        trimAfter(length: number, suffix?: string): string;
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

String.prototype.nlToBr = function () {
    const self = this as string;

    return self.replace(/\n/g, '<br />');
};

String.prototype.trimAfter = function (length: number, suffix = '...') {
    const self = this.replace(/[\s\t\r]+/gi, ' ') as string;

    if (self.length <= length) {
        return self;
    }

    return self.substring(0, length).concat(suffix);
};

export {};
