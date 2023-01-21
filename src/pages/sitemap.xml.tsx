import fs from 'fs';
import { GetServerSideProps } from 'next'

export default () => {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: 'http://localhost:3000',
        production: 'https://jeanmolossi.com.br',
        test: 'http://localhost:3000'
    }[process.env.NODE_ENV]

    const pages = readFolderRecursive(__dirname)
        .filter(hiddenPaths)
        .map(toSitemapUrl(baseUrl))
        .map(UrlMap)

    res.setHeader("Content-Type", "text/xml");
    res.write(siteMap(paths(pages)));
    res.end();

    return { props: {} }
}

/**
 * toSitemapUrl - Transforms path like `/path/to/page`
 * @param {string} baseUrl host base url from the application
 * @returns {(url: string) => string} function to transform a path to a url
 */
function toSitemapUrl(baseUrl: string): (url: string) => string {
    // should removes .html to make frindly url
    return (path: string) => `${baseUrl}/${path.replace(/(\.html|index)/gi, '')}`
}

/**
 * readFolderRecursive - Reads a folder recursively and returns an array of paths
 * @param {string} folder path to folder to read
 * @param {string | undefined} parent if has parent folder
 * @returns {string[]} list of paths
 */
function readFolderRecursive(folder: string, parent: string | undefined = ''): string[] {
    // read folder as root folder
    const root = fs.readdirSync(folder);

    const files = root.map(file => {
        const path = `${folder}/${file}`;
        const isDir = fs.statSync(path).isDirectory();

        // if has parent folder, add it to the path
        const parentPath = parent ? `${parent}/${file}` : file;

        // if is a folder, read it recursively
        if (isDir) {
            return readFolderRecursive(path, parentPath);
        }

        // only return html pages
        if (isHtmlPage(file)) {
            return [parentPath];
        }

        return [];
    });

    return files.flat();
}

/**
 * paths - Transforms an array of paths to an array of UrlMap
 * @param {string} locations list of locations
 * @returns {string} list of UrlMap
 */
function paths(locations: string[]): string {
    return locations?.join('\n') ?? '';
}

/**
 * UrlMap - Transforms a path to a UrlMap
 * @param url - url to be added to the sitemap
 * @returns {string} - url to be added to the sitemap
 */
function UrlMap(url: string): string {
    return `
        <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
    `;
}

/**
 * siteMap - Transforms an array of UrlMap to a sitemap
 * @param {string} urlMap - url map of locations to be added into sitemap
 * @returns {string} - sitemap built with UrlMap
 */
function siteMap(urlMap: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlMap}
        </urlset>
    `
}

/**
 * isHtmlPage - Checks if a file is a html page
 * @param path - path to be checked
 * @returns {boolean} - true if is file wich extension .html
 */
function isHtmlPage(path: string): boolean {
    return Boolean(path.match(/\.html$/gi))
}

/**
 * hiddenPaths - Returns if the path should be hidden
 * @param {string} path - is the path to be checked
 * @returns {boolean} - path should be hidden
 */
function hiddenPaths(path: string): boolean {
    const pathsToHide = ['404', '500'];

    let shouldHide = false;

    pathsToHide.forEach(pathToHide => {
        const regex = new RegExp(`${pathToHide}(\\.html)?$`, 'gi');
        if (regex.test(path)) {
            shouldHide = true;
        }
    })

    return !shouldHide;
}
