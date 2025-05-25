import { Default, resolveDefault, defaultToNull, useDefault } from '.';
import { expectNotType, expectType } from 'tsd';

// ✅ When both value and defaultValue are the same constant literal.
expectType<'a'>(resolveDefault('a', 'a'));

// ❌ A constant literal value ('a') cannot be resolved to null.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as null
resolveDefault('a', null);

// ❌ A constant literal value ('a') cannot be resolved to null again.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as null
resolveDefault('a', null);

// ❌ A constant literal value ('a') cannot be resolved to undefined.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as undefined
resolveDefault('a', undefined);

// ❌ The fallback must be of the same type as the value.
// @ts-expect-error: fallback must match the type of value
resolveDefault('a', undefined);

// ❌ Different string literal fallback is not allowed when the value is a fixed literal.
// @ts-expect-error: fallback must match the exact type 'a'
resolveDefault('a', 'b');

// ❌ Default value cannot be used as a fallback.
// @ts-expect-error: fallback must not be a Default sentinel
resolveDefault(useDefault, useDefault);


// ✅ When both value and defaultValue are the same constant literal.
expectType<'a'>(Default.resolve('a', 'a'));

// ❌ A constant literal value ('a') cannot be resolved to null.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as null
Default.resolve('a', null);

// ❌ A constant literal value ('a') cannot be resolved to null again.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as null
Default.resolve('a', null);

// ❌ A constant literal value ('a') cannot be resolved to undefined.
// @ts-expect-error: value is a constant 'a', cannot be evaluated as undefined
Default.resolve('a', undefined);

// ❌ The fallback must be of the same type as the value.
// @ts-expect-error: fallback must match the type of value
Default.resolve('a', undefined);

// ❌ Different string literal fallback is not allowed when the value is a fixed literal.
// @ts-expect-error: fallback must match the exact type 'a'
Default.resolve('a', 'b');

// ❌ Default value cannot be used as a fallback.
// @ts-expect-error: fallback must not be a Default sentinel
Default.resolve(useDefault, useDefault);



declare let strOrDefault: string | Default;

// ✅ When the input is a string or Default, with a proper string fallback.
expectType<string>(resolveDefault(strOrDefault, 'default'));

// ❌ Cannot use a fallback of a different type (e.g., number).
// @ts-expect-error: fallback 1 is not assignable to type string
resolveDefault(strOrDefault, 1);

// ❌ Cannot use undefined as fallback when the value is not optional.
// @ts-expect-error: fallback cannot be undefined
resolveDefault(strOrDefault, undefined);

// ❌ Cannot use null as fallback when not explicitly allowed.
// @ts-expect-error: fallback cannot be null unless null is explicitly allowed
resolveDefault(strOrDefault, null);

// ✅ defaultToNull can convert Default sentinel into null.
expectType<string | null>(defaultToNull(strOrDefault));

// ✅ Useful for nullish coalescing with defaultToNull.
expectType<string | 1>(defaultToNull(strOrDefault) ?? 1);

// ✅ When the input is a string or Default, with a proper string fallback.
expectType<string>(Default.resolve(strOrDefault, 'default'));

// ❌ Cannot use a fallback of a different type (e.g., number).
// @ts-expect-error: fallback 1 is not assignable to type string
Default.resolve(strOrDefault, 1);

// ❌ Cannot use undefined as fallback when the value is not optional.
// @ts-expect-error: fallback cannot be undefined
Default.resolve(strOrDefault, undefined);

// ❌ Cannot use null as fallback when not explicitly allowed.
// @ts-expect-error: fallback cannot be null unless null is explicitly allowed
Default.resolve(strOrDefault, null);

// ✅ Default.toNull can convert Default sentinel into null.
expectType<string | null>(Default.toNull(strOrDefault));

// ✅ Useful for nullish coalescing with Default.toNull.
expectType<string | 1>(Default.toNull(strOrDefault) ?? 1);

strOrDefault = 'test';

// ✅ If the value is a string, resolveDefault and defaultToNull behave predictably.
expectType<string>(resolveDefault(strOrDefault, 'default'));
expectType<string>(defaultToNull(strOrDefault));
expectNotType<null>(defaultToNull(strOrDefault));

// ✅ If the value is a string, Default.resolve and Default.toNull behave predictably.
expectType<string>(Default.resolve(strOrDefault, 'default'));
expectType<string>(Default.toNull(strOrDefault));
expectNotType<null>(Default.toNull(strOrDefault));

strOrDefault = useDefault; // or Default.value()

// ✅ If the value is Default, fallback is returned.
expectType<'default'>(resolveDefault(strOrDefault, 'default'));
expectType<null>(resolveDefault(strOrDefault, null));
expectType<undefined>(resolveDefault(strOrDefault, undefined));

// ✅ If the value is Default, fallback is returned.
expectType<'default'>(Default.resolve(strOrDefault, 'default'));
expectType<null>(Default.resolve(strOrDefault, null));
expectType<undefined>(Default.resolve(strOrDefault, undefined));