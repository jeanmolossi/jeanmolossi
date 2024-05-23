export default function strapiImageLoader({ src, width, quality } = {}) {
    /** @type {string} */
    const srcWithoutHeadslash = src.replace(/^\//, '');

    const isLocalStatic = srcWithoutHeadslash.startsWith('_next');
    const isStrapiUpload = srcWithoutHeadslash.startsWith('uploads')
    const isExternal = srcWithoutHeadslash.startsWith('http')

    if (isExternal) return src;

    if (isLocalStatic || !isStrapiUpload)
        return `https://jeanmolossi.com.br/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`;

    return `https://cdn.jeanmolossi.com.br/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`
}
