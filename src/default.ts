/**
 * Represents a special marker object indicating that a default value should be used.
 * Useful for building APIs with explicit default handling.
 */
export class Default {
    // Private constructor ensures singleton pattern
    private constructor() { }

    // Dummy field to make instanceof checks work reliably
    // @ts-ignore
    readonly #dummy = true;

    /**
     * The singleton instance representing a "use default" marker.
     */
    static readonly value = new Default();

    /**
     * Resolves the given value. If it is a `Default`, returns the provided fallback.
     * Otherwise, returns the value itself.
     */
    static resolve<T extends unknown>(
        value: Exclude<T, Default>,
        defaultValue: T
    ): T;
    static resolve<T extends unknown, D extends T>(
        value: T | Default,
        defaultValue: Exclude<D, Default>
    ): T;
    static resolve<D extends unknown>(
        value: Default,
        defaultValue: Exclude<D, Default>
    ): D;
    static resolve<T extends unknown, D extends T>(
        value: T | Default,
        defaultValue: Exclude<D, Default>
    ): T {
        return resolveDefault(value, defaultValue);
    }

    /**
     * Converts a value to `null` if it is `Default.value`.
     */
    static toNull<T extends unknown>(value: Default): null;
    static toNull<T extends unknown>(value: Exclude<T, Default>): T;
    static toNull<T extends unknown>(value: T | Default): T | null;
    static toNull<T extends unknown>(value: T | Default): T | null {
        return resolveDefault(value, null as unknown) as T | null;
    }

    /**
     * Converts a value to `undefined` if it is `Default.value`.
     */
    static toUndefined<T extends unknown>(value: Default): undefined;
    static toUndefined<T extends unknown>(value: Exclude<T, Default>): T;
    static toUndefined<T extends unknown>(value: T | Default): T | undefined;
    static toUndefined<T extends unknown>(value: T | Default): T | undefined {
        return resolveDefault(value, undefined as unknown) as T | undefined;
    }
}

/**
 * The singleton default marker.
 */
export const useDefault = Default.value;

/**
 * Checks if a given value is the special default marker.
 */
export function isDefault<T extends unknown>(value: T | Default): value is Default {
    return value instanceof Default;
}

/**
 * Resolves the value to the default if it is marked as `Default`.
 */
export function resolveDefault<T extends unknown>(
    value: Exclude<T, Default>,
    defaultValue: T
): T;
export function resolveDefault<T extends unknown, D extends T>(
    value: T | Default,
    defaultValue: Exclude<D, Default>
): T;
export function resolveDefault<D extends unknown>(
    value: Default,
    defaultValue: Exclude<D, Default>
): D;
export function resolveDefault<T extends unknown, D extends T>(
    value: T | Default,
    defaultValue: Exclude<D, Default>
): T {
    return isDefault(value) ? defaultValue : value;
}

/**
 * Converts a value to null if it is the `Default` marker.
 */
export function defaultToNull<T extends unknown>(value: Default): null;
export function defaultToNull<T extends unknown>(value: Exclude<T, Default>): T;
export function defaultToNull<T extends unknown>(value: T | Default): T | null;
export function defaultToNull<T extends unknown>(value: T | Default): T | null {
    return resolveDefault(value, null as unknown) as T | null;
}

/**
 * Converts a value to undefined if it is the `Default` marker.
 */
export function defaultToUndefined<T extends unknown>(value: Default): undefined;
export function defaultToUndefined<T extends unknown>(value: Exclude<T, Default>): T;
export function defaultToUndefined<T extends unknown>(value: T | Default): T | undefined;
export function defaultToUndefined<T extends unknown>(value: T | Default): T | undefined {
    return resolveDefault(value, undefined as unknown) as T | undefined;
}
