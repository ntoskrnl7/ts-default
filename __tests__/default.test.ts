import { Default, resolveDefault, defaultToNull, defaultToUndefined, useDefault, isDefault } from '..';

describe('Default system - runtime behavior', () => {
    test('useDefault is an instance of Default', () => {
        expect(useDefault).toBeInstanceOf(Default);
    });

    test('isDefault detects Default correctly', () => {
        expect(isDefault(useDefault)).toBe(true);
        expect(isDefault(undefined)).toBe(false);
        expect(isDefault(null)).toBe(false);
        expect(isDefault("hello")).toBe(false);
        expect(isDefault({})).toBe(false);
    });

    describe('resolveDefault', () => {
        test('returns original value if not Default', () => {
            const value: string | Default = "actual";
            const resolved = resolveDefault(value, "fallback");
            expect(resolved).toBe("actual");
        });

        test('returns fallback if value is Default', () => {
            const value: string | Default = useDefault;
            const resolved = resolveDefault(value, "fallback");
            expect(resolved).toBe("fallback");
        });

        test('handles null and undefined as fallback', () => {
            const value: string | Default = useDefault;
            const resolvedNull = resolveDefault(value, null);
            expect(resolvedNull).toBeNull();

            const resolvedUndefined = resolveDefault(value, undefined);
            expect(resolvedUndefined).toBeUndefined();
        });
    });

    describe('defaultToNull', () => {
        test('returns original value if not Default', () => {
            const value: string | Default = "real";
            const result = defaultToNull(value);
            expect(result).toBe("real");
        });

        test('returns null if value is Default', () => {
            const value: string | Default = useDefault;
            const result = defaultToNull(value);
            expect(result).toBeNull();
        });
    });

    describe('defaultToUndefined', () => {
        test('returns original value if not Default', () => {
            const value: string | Default = "hello";
            const result = defaultToUndefined(value);
            expect(result).toBe("hello");
        });

        test('returns undefined if value is Default', () => {
            const value: string | Default = useDefault;
            const result = defaultToUndefined(value);
            expect(result).toBeUndefined();
        });
    });

    describe('Default static methods', () => {
        test('Default.resolve behaves like resolveDefault', () => {
            const value1: string | Default = "abc";
            const value2: string | Default = useDefault;
            expect(Default.resolve(value1, "fallback")).toBe("abc");
            expect(Default.resolve(value2, "fallback")).toBe("fallback");
        });

        test('Default.toNull behaves like defaultToNull', () => {
            const value1: string | Default = "def";
            const value2: string | Default = useDefault;
            expect(Default.toNull(value1)).toBe("def");
            expect(Default.toNull(value2)).toBeNull();
        });

        test('Default.toUndefined behaves like defaultToUndefined', () => {
            const value1: string | Default = "ghi";
            const value2: string | Default = useDefault;
            expect(Default.toUndefined(value1)).toBe("ghi");
            expect(Default.toUndefined(value2)).toBeUndefined();
        });
    });
});
