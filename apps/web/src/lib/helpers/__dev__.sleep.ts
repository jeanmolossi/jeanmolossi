export async function sleep(timeout: number): Promise<void> {
    // avoid forget some sleep on production
    if (process.env.NODE_ENV === 'production') return Promise.resolve();
    return new Promise(r => setTimeout(r, timeout));
}
