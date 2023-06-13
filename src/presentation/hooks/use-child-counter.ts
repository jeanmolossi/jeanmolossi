'use client';

/**
 * useChildCounter hook
 *
 * Example:
 * ```
 *      const next = useChildCounter();
 *      <Component child={next()} /> // child will be 1
 *      <Component child={next()} /> // child will be 2
 * ```
 * @returns A callback function to increment child number and return it
 */
export function useChildCounter(): () => number {
    let counter = 1;

    return () => ++counter;
}
