---
title: "Design Patterns in Modern JavaScript"
description: "Exploring how classic design patterns like Singleton, Observer, and Factory translate into modern JavaScript with ES modules, classes, and functional programming."
date: "2026-03-08"
author: "Yogesh Bhardwaj"
readTime: "8 min read"
tags: ["JavaScript", "Design Patterns", "Architecture"]
---

# Design Patterns in Modern JavaScript

Design patterns are reusable solutions to commonly occurring problems in software design. While the original Gang of Four patterns were written with C++ and Smalltalk in mind, they translate remarkably well into JavaScript — sometimes even more elegantly.

Let's look at how some of the most useful patterns manifest in modern JavaScript.

## The Singleton Pattern

The Singleton ensures a class has only one instance. In JavaScript, ES modules already provide this behavior naturally:

```javascript
// database.js
class Database {
  constructor() {
    this.connection = null;
  }

  connect(url) {
    if (!this.connection) {
      this.connection = { url, connected: true };
      console.log(`Connected to ${url}`);
    }
    return this.connection;
  }
}

export const db = new Database();
```

Because ES modules are cached after first evaluation, every file that imports `db` gets the exact same instance. No extra pattern plumbing needed.

## The Observer Pattern

The Observer pattern defines a one-to-many dependency between objects. When one object changes state, all its dependents are notified. This is the backbone of event-driven programming.

```javascript
class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const callbacks = this.#listeners.get(event);
    if (callbacks) {
      this.#listeners.set(
        event,
        callbacks.filter((cb) => cb !== callback)
      );
    }
  }

  emit(event, ...args) {
    const callbacks = this.#listeners.get(event) || [];
    callbacks.forEach((cb) => cb(...args));
  }
}
```

This pattern is everywhere — from DOM events to React's state management to Node.js streams.

## The Factory Pattern

Factories abstract the creation of objects. Instead of using `new` directly, you delegate construction to a factory function:

```javascript
function createNotification(type, message) {
  const base = {
    id: crypto.randomUUID(),
    message,
    timestamp: Date.now(),
  };

  switch (type) {
    case "success":
      return { ...base, type, icon: "✓", color: "green" };
    case "error":
      return { ...base, type, icon: "✗", color: "red" };
    case "warning":
      return { ...base, type, icon: "⚠", color: "yellow" };
    default:
      return { ...base, type: "info", icon: "ℹ", color: "blue" };
  }
}
```

Factories shine when you need to create objects with complex setup logic or when the exact type of object depends on runtime conditions.

## The Strategy Pattern

The Strategy pattern lets you define a family of algorithms, encapsulate each one, and make them interchangeable:

```javascript
const pricingStrategies = {
  regular: (price) => price,
  premium: (price) => price * 0.9,
  vip: (price) => price * 0.8,
  employee: (price) => price * 0.5,
};

function calculatePrice(basePrice, customerType) {
  const strategy = pricingStrategies[customerType] || pricingStrategies.regular;
  return strategy(basePrice);
}

console.log(calculatePrice(100, "premium")); // 90
console.log(calculatePrice(100, "vip")); // 80
```

In JavaScript, first-class functions make the Strategy pattern almost invisible — it's just passing functions around.

## The Decorator Pattern

Decorators wrap existing functionality with additional behavior without modifying the original:

```javascript
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Calling add with [2, 3]
// add returned 5
```

This is the same idea behind higher-order components in React, middleware in Express, and decorators in TypeScript.

## When to Use Patterns

Design patterns are tools, not rules. The key guidelines:

- **Don't force patterns** where a simple function would do
- **Use patterns when they clarify intent**, not when they add complexity
- **JavaScript's flexibility** often means patterns emerge naturally — you don't always need to implement them formally
- **Learn the principles behind patterns** (encapsulation, loose coupling, composition) rather than memorizing implementations

## Conclusion

Modern JavaScript, with its modules, closures, higher-order functions, and prototypal inheritance, is a remarkably pattern-friendly language. Many patterns that require significant boilerplate in other languages are almost trivial in JavaScript. The key is recognizing when a pattern fits and applying it with the right level of abstraction.
