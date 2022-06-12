export function useChildCounter() {
    let counter = 1;

    return () => ++counter;
}
