declare global {
    interface Promise<T> {
        sleep(timeout: number): Promise<void>;
    }
}

Promise.prototype.sleep = async function(timeout = 3000) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

export {};
