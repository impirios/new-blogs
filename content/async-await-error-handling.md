---
title: "Async/Await Error Handling Done Right"
description: "Stop wrapping everything in try-catch. Learn practical, clean patterns for handling errors in async JavaScript code."
date: "2026-03-05"
author: "Yogesh Bhardwaj"
readTime: "5 min read"
tags: ["JavaScript", "Async", "Best Practices"]
---

# Async/Await Error Handling Done Right

If you've been writing async JavaScript for any amount of time, you've probably ended up with code that looks like this:

```javascript
async function loadDashboard() {
  try {
    const user = await fetchUser();
    try {
      const posts = await fetchPosts(user.id);
      try {
        const comments = await fetchComments(posts[0].id);
        return { user, posts, comments };
      } catch (e) {
        console.error("Failed to load comments", e);
      }
    } catch (e) {
      console.error("Failed to load posts", e);
    }
  } catch (e) {
    console.error("Failed to load user", e);
  }
}
```

Nested try-catch blocks everywhere. It works, but it's hard to read, hard to maintain, and violates the very reason we moved to async/await — to write async code that looks synchronous and clean.

Let's look at better approaches.

## The Tuple Pattern

Inspired by Go's error handling, you can wrap async calls to return `[error, data]` tuples:

```javascript
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}
```

Now your code reads linearly:

```javascript
async function loadDashboard() {
  const [userErr, user] = await to(fetchUser());
  if (userErr) return handleError("user", userErr);

  const [postsErr, posts] = await to(fetchPosts(user.id));
  if (postsErr) return handleError("posts", postsErr);

  const [commentsErr, comments] = await to(fetchComments(posts[0].id));
  if (commentsErr) return handleError("comments", commentsErr);

  return { user, posts, comments };
}
```

Each error is handled inline, no nesting, and you can decide per-call whether an error is fatal or recoverable.

## The Result Type

Taking the tuple pattern further, you can create a more structured Result type:

```javascript
class Result {
  #value;
  #error;

  constructor(value, error) {
    this.#value = value;
    this.#error = error;
  }

  static ok(value) {
    return new Result(value, null);
  }

  static fail(error) {
    return new Result(null, error);
  }

  get isOk() {
    return this.#error === null;
  }

  unwrap() {
    if (this.#error) throw this.#error;
    return this.#value;
  }

  unwrapOr(fallback) {
    return this.isOk ? this.#value : fallback;
  }
}
```

This gives you a richer API for handling results:

```javascript
const result = await fetchUser().then(Result.ok).catch(Result.fail);

const user = result.unwrapOr({ name: "Guest", role: "anonymous" });
```

## Centralized Error Boundaries

For operations that share the same error handling logic, a single try-catch at the right level is perfectly fine:

```javascript
async function loadDashboard() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  return { user, posts, comments };
}

// Called from a higher level with a single error boundary
try {
  const dashboard = await loadDashboard();
  render(dashboard);
} catch (error) {
  showErrorPage(error);
}
```

This works well when:
- All errors in a sequence should be handled the same way
- You want to fail fast on any error
- The caller is responsible for error presentation

## Promise.allSettled for Parallel Operations

When running operations in parallel where some can fail independently:

```javascript
async function loadPageData() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchNotifications(),
    fetchRecommendations(),
  ]);

  return {
    user: results[0].status === "fulfilled" ? results[0].value : null,
    notifications: results[1].status === "fulfilled" ? results[1].value : [],
    recommendations: results[2].status === "fulfilled" ? results[2].value : [],
  };
}
```

The page still loads even if notifications or recommendations fail. Only the user data might be truly critical.

## Choosing the Right Pattern

| Scenario | Pattern |
|---|---|
| Different handling per call | Tuple pattern |
| Rich error/success modeling | Result type |
| Same handling for all errors | Single try-catch |
| Parallel independent operations | Promise.allSettled |
| Fire-and-forget operations | `.catch()` on the promise |

## The Bottom Line

Error handling in async code doesn't have to be ugly. Choose a pattern that fits your use case, stay consistent across your codebase, and always think about what the *user* should experience when something goes wrong — not just what the developer console should show.
