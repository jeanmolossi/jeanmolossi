export default function strapiImageLoader({ src, width, quality } = {}) {
    /** @type {string} */
    const srcWithoutHeadslash = src.replace(/^\//, '');

    const isLocalStatic = srcWithoutHeadslash.startsWith('_next');

    if (isLocalStatic)
        return `http://localhost:3000/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`;

    return `http://localhost:1337/${srcWithoutHeadslash}?w=${width}&q=${quality||75}`
}
