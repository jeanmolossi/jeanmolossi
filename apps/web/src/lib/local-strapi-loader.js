export default function strapiImageLoader({ src, width, quality } = {}) {
    /** @type {string} */
    const srcWithoutHeadslash = src.replace(/^\//, '');

    const isLocalStatic = srcWithoutHeadslash.startsWith('_next');
    const isStrapiUpload = srcWithoutHeadslash.startsWith('uploads')
    const isExternal = srcWithoutHeadslash.startsWith('http')

    if (isExternal) {
        const url = new URL(src)
        url.searchParams.append('w', width)
        url.searchParams.append('q', quality || 75)
        return url.toString()
    };

    if (isLocalStatic || !isStrapiUpload)
        return `http://localhost:3000/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`;

    return `http://localhost:1337/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`
}
