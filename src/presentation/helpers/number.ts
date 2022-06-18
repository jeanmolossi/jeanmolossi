export {};

declare global {
    interface Number {
        compress(options?: CompressOptions): string;
    }

    interface Number {
        compress(options?: CompressOptions): string;
    }

    interface CompressOptions {
        compressAfter?: number;
        compressSuffix?: string;
        sufixxes?: string[];
        decimalMarker?: string;
        milliardMarker?: string;
    }
}

function getSuffix(
    index: number = 0,
    suffixes = ['mil', 'mi', 'bi', 'tri', 'quadr'],
): string {
    const suffix = suffixes[index] || 'no-suffix';
    return suffix;
}

function defaultCompressOptions(options?: CompressOptions, index = 0) {
    const compressSuffix =
        options?.sufixxes?.[index] || getSuffix(index, options?.sufixxes);

    return {
        compressAfter: 1000,
        compressSuffix,
        decimalMarker: ',',
        ...(options || {}),
    };
}

function compress(value: number, options?: CompressOptions, index = 0): string {
    const { compressAfter, compressSuffix, decimalMarker } =
        defaultCompressOptions(options, index);

    const compressed = Number((value / compressAfter).toFixed(1));

    if (compressed >= compressAfter) {
        const nextSuffixIndex = index + 1;

        return compress(
            compressed,
            {
                compressSuffix: getSuffix(nextSuffixIndex),
                compressAfter,
            },
            nextSuffixIndex,
        );
    }

    return `${compressed} ${compressSuffix}`.replace(/\./gm, decimalMarker);
}

Number.prototype.compress = function (options?: CompressOptions) {
    const self = this as number;

    const { compressAfter } = defaultCompressOptions({
        compressAfter: 10000,
        ...(options || {}),
    });

    if (self >= compressAfter) {
        return compress(self, options);
    }

    if (self >= 1000) {
        if (self / 1000 === 1) {
            return '1.000';
        }

        return `${self / 1000}`;
    }

    return `${self}`;
};
