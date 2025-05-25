# 🧩 ts-default

A tiny utility to represent and handle default values in a type-safe and expressive way in TypeScript.
Use `Default.value` as an explicit placeholder and defer resolution until later.

---

## 📦 Installation

```bash
npm install ts-default
```

Or with yarn:

```bash
yarn add ts-default
```

---

## 🔧 Basic Usage

```ts
import { Default } from 'ts-default';

function greet(name: string | Default = Default.value): string {
    return `Hello, ${Default.resolve(name, 'World')}!`;
}

/*
or

import { useDefault, resolveDefault } from 'ts-default';

function greet(name: string | Default = useDefault): string {
  return `Hello, ${resolveDefault(name, 'World')}!`;
}
 */

greet(); // "Hello, World!"
greet('Alice');    // "Hello, Alice!"
```

---

## 🧰 API Reference

### 🔹 `Default.value`

The singleton marker object representing an explicit request to "use default".

```ts
import { useDefault } from 'ts-default';

const name = useDefault;
```

---

### 🔹 `isDefault(value)`

Checks if the value is the `Default` sentinel.

```ts
isDefault(useDefault);    // true
isDefault(Default.value); // true
isDefault('hello');       // false
```

---

### 🔹 `resolveDefault(value, fallback)`

Returns `value` unless it's `Default`, in which case it returns `fallback`.

```ts
let value: string | Default = useDefault;
resolveDefault(value, 'fallback'); // 'fallback'
value = 'value';
resolveDefault(value, 'fallback');    // 'value'
```

---

### 🔹 `defaultToNull(value)` / `Default.toNull(value)`

Returns `null` if the value is `Default`, otherwise returns the original value.

```ts
defaultToNull(useDefault); // null
defaultToNull('value');    // 'value'
```

---

### 🔹 `defaultToUndefined(value)` / `Default.toUndefined(value)`

Returns `undefined` if the value is `Default`, otherwise returns the original value.

```ts
defaultToUndefined(useDefault); // undefined
defaultToUndefined('value');    // 'value'
```

---

## 💡 Nullish Coalescing Integration

These utilities are ideal for integration with `??`:

```ts
const value: string | Default = useDefault;

const result = defaultToNull(value) ?? 'fallback';
// If value is Default => 'fallback'
// If value is 'actual' => 'actual'
```

---

## 📏 Type Safety

The utility uses overloads to ensure that types are strict and safe:

- Prevents fallback types that don't match the expected value type
- Ensures `Default` is never used as a fallback
- Supports narrow literal inference

```ts
declare let input: string | Default;

const result = resolveDefault(input, 'default');
// result: string

const unsafe = resolveDefault('fixed', 'other'); // ❌ Type Error if types don't match
```

---

## ✅ TSD Type Tests

You can write tests with [`tsd`](https://github.com/SamVerschueren/tsd) to verify strict typing:

```ts
import { Default, resolveDefault, defaultToNull, useDefault } from 'ts-default';
import { expectType, expectNotType } from 'tsd';

declare let input: string | Default;

expectType<string>(resolveDefault(input, 'fallback'));
expectType<string | null>(defaultToNull(input));
expectType<string>(Default.resolve(input, 'fallback'));
expectType<string | null>(Default.toNull(input));

// @ts-expect-error: fallback type must match
resolveDefault('a', 1);
```

---

## 🛠️ Use Cases

- API parameter defaults
- Configuration resolution
- Conditional form values
- CLI option parsing

---
