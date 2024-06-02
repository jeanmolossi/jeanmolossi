import fs from 'fs';
import path from 'path';

const pagesJson = JSON.parse(
    fs
        .readFileSync(path.resolve('./apps/web/.next/app-build-manifest.json'))
        .toString('ascii'),
);

const pagesLimits = JSON.parse(
    fs.readFileSync(path.resolve('page-limits.json')).toString('ascii'),
);

// Função para calcular o tamanho dos arquivos em bytes
const calculatePageSize = files => {
    let totalSize = 0;

    files.forEach(file => {
        const filePath = path.resolve('./apps/web/.next', file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
        } else {
            console.error(`File not found: ${filePath}`);
        }
    });

    return totalSize;
};

// Função para formatar o tamanho em uma unidade legível
const formatSize = bytes => {
    const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i < 0) i = 0;
    return `${(bytes / 1024 ** i).toFixed(4)} ${sizes[i]}`;
};

// Função para pegar uma unidade e transformar em bytes
const parseSize = sizeStr => {
    const units = ['Bytes', 'kB', 'MB', 'GB', 'TB'];
    const unit = sizeStr.replace(/[^a-zA-Z]/g, '').trim(); // Extrai a unidade do valor
    const value = parseFloat(sizeStr.replace(/[^0-9.]/g, '')); // Extrai o valor numérico do valor

    const index = units.indexOf(unit);
    if (index === -1) {
        throw new Error(`Unrecognized unit: ${unit}`);
    }

    return value * 1024 ** index;
};

let processExitCode = 0;
let reprocessLimits = false;

// Calcular e exibir o tamanho de cada página
for (const [page, files] of Object.entries(pagesJson.pages)) {
    const pageSize = calculatePageSize(files);

    if (!pagesLimits[page]) {
        pagesLimits[page] = `${formatSize(pageSize - 1)}`;
        reprocessLimits = true;
    }

    const pageLimit = parseSize(pagesLimits[page]);

    if (pageSize > pageLimit) {
        if (processExitCode === 0) processExitCode = 1;

        console.error(
            '\x1b[31m[ERROR]\x1b[m Size is greater than limit\n',
            `${page}\n\t`,
            `\x1b[31mPage size\x1b[0m:\t${formatSize(pageSize)}\n\t`,
            `\x1b[32mLimit\x1b[0m:\t\t${pagesLimits[page]}\n\t`,
            `\x1b[31mExceeded by:\x1b[0m\t${formatSize(pageSize - pageLimit)}`,
        );
    }
}

if (reprocessLimits) {
    fs.writeFileSync('page-limits.json', JSON.stringify(pagesLimits, null, 4));
}

if (processExitCode === 1) {
    process.exit(1);
}
