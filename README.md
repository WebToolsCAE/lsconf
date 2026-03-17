<div align="center">

# ⚙️ LSconf

### List-Shorthand Configuration Library

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub](https://img.shields.io/badge/GitHub-WebToolsCAE-181717.svg?logo=github)](https://github.com/WebToolsCAE)

A lightweight, zero-dependency library for defining object structures and creating instances through simple `.lsconf` configuration files.

[Getting Started](#getting-started) •
[File Format](#the-lsconf-file-format) •
[API](#api) •
[Examples](#examples)

---

</div>

## What is LSconf?

LSconf is a minimal configuration format designed for structured data lists. Instead of verbose JSON or YAML, LSconf lets you:

- **Define any object structure** with shorthand property keys
- **Create multiple instances** of that structure with compact syntax
- **Load and access objects** directly in JavaScript via a simple API

It's ideal for datasets, configuration lists, object constructors, user post data, and any scenario where you need many instances of the same shape.

---

## Getting Started

### 1. Include the parser

Add the script to your HTML file:

```html
<script src="lsconf-parser.js"></script>
```

### 2. Create a `.lsconf` file

Create a configuration file (e.g. `data.lsconf`) with your object definitions:

```
N - name
A - age
R - role

N~Alice
A~30
R~developer

N~Bob
A~25
R~designer

N~Charlie
A~35
R~manager
```

### 3. Parse and use

```javascript
await lsParse('data.lsconf', 'team');

// Your data is now available on window.team
console.log(team);
// [
//   { name: "Alice", age: "30", role: "developer", id: "team1" },
//   { name: "Bob", age: "25", role: "designer", id: "team2" },
//   { name: "Charlie", age: "35", role: "manager", id: "team3" }
// ]
```

---

## The `.lsconf` File Format

An LSconf file has two sections:

### Property Definitions

At the top of the file, you declare your object's properties. Each line maps a **shorthand key** to a **property name** using ` - ` as a separator:

```
KEY - propertyName
```

You can define **any properties you want** — there are no reserved or required keys. The shorthand key can be any character or string:

```
T - title
D - description
P - priority
S - status
```

### Object Instances

After the property definitions, you create object instances by assigning values to each key using `~` as a separator:

```
T~Fix login bug
D~Users cannot log in with email
P~high
S~open

T~Add dark mode
D~Implement theme toggle
P~medium
S~in-progress
```

Each group of properties forms **one object instance**. Once all defined properties are filled, the object is complete and a new one begins automatically.

> **Note:** Every property must be assigned a value for each instance. The parser automatically detects when all properties have been set and starts a new object.

---

## API

### `lsParse(path, objectName)`

Fetches and parses an LSconf file, then stores the resulting array of objects on `window`.

| Parameter | Type | Description |
|---|---|---|
| `path` | `string` | Path or URL to the `.lsconf` file |
| `objectName` | `string` | Name of the global variable to store the parsed data |

**Returns:** `Promise<void>`

```javascript
await lsParse('config/items.lsconf', 'items');
```

After parsing, the data is accessible as a global variable:

```javascript
// Access the full array
console.log(window.items);

// Access a specific object
console.log(items[0]);

// Access a property
console.log(items[0].name);

// Iterate
items.forEach(item => {
  console.log(item.id, item.name);
});
```

### Auto-generated `id`

Each parsed object automatically receives an `id` property in the format `objectName + index` (starting from 1). For example, if `objectName` is `"product"`:

```
product1, product2, product3, ...
```

---

## Examples

### Product Catalog

```
N - name
C - category
P - price

N~Keyboard
C~peripherals
P~49.99

N~Monitor
C~displays
P~299.99

N~Webcam
C~peripherals
P~79.99
```

```javascript
await lsParse('products.lsconf', 'products');

products.forEach(p => {
  console.log(`${p.name} (${p.category}): $${p.price}`);
});
// Keyboard (peripherals): $49.99
// Monitor (displays): $299.99
// Webcam (peripherals): $79.99
```

### Indexed List

```
I - index
V - value

I~0
V~512

I~1
V~184

I~2
V~921
```

See the full example in [`examples/list.lsconf`](examples/list.lsconf).

---

## Format at a Glance

```
┌─────────────────────────────────────────┐
│  PROPERTY DEFINITIONS                   │
│                                         │
│  KEY - description                      │
│  KEY - description                      │
│                                         │
├─────────────────────────────────────────┤
│  OBJECT INSTANCES                       │
│                                         │
│  KEY~value      ┐                       │
│  KEY~value      ┘ Object 1              │
│                                         │
│  KEY~value      ┐                       │
│  KEY~value      ┘ Object 2              │
│                                         │
│  ...                                    │
└─────────────────────────────────────────┘
```

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Made by [**WebToolsCAE**](https://github.com/WebToolsCAE)

[![GitHub followers](https://img.shields.io/github/followers/WebToolsCAE?style=social)](https://github.com/WebToolsCAE)
[![GitHub stars](https://img.shields.io/github/stars/WebToolsCAE/lsconf?style=social)](https://github.com/WebToolsCAE/lsconf)

</div>