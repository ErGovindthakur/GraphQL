# 🚀 Govind's GraphQL Learning Journey

Welcome to my GraphQL learning tracker! This README documents all the key concepts, hands-on projects, and useful resources I explore while mastering GraphQL.

---

## 📅 Started On: [24 April 2025]

---

## 📚 Table of Contents

1. [What is GraphQL?](#what-is-graphql)
2. [Core Concepts](#core-concepts)
3. [GraphQL vs REST](#graphql-vs-rest)
4. [Setting Up GraphQL Server](#setting-up-graphql-server)
5. [Queries & Mutations](#queries--mutations)
6. [Schema & Types](#schema--types)
7. [Resolvers](#resolvers)
8. [Apollo Server (Node.js)](#apollo-server-nodejs)
9. [Apollo Client (React)](#apollo-client-react)
10. [Advanced Topics](#advanced-topics)
11. [Mini Projects](#mini-projects)
12. [Resources](#resources)

---

## 🔍 What is GraphQL?

- A query language for APIs.
- Developed by Facebook.
- Fetches **only the data you need** in a single request.
- Works with any backend or database.

---

## 🔑 Core Concepts

- [ ] Schema
- [ ] Types (Object types, Scalars, Enums, etc.)
- [ ] Queries (Read)
- [ ] Mutations (Write)
- [ ] Subscriptions (Real-time updates)
- [ ] Resolvers
- [ ] Root types (`Query`, `Mutation`, `Subscription`)

---

## ⚔️ GraphQL vs REST

| Feature        | REST               | GraphQL         |
| -------------- | ------------------ | --------------- |
| Data Fetching  | Multiple endpoints | Single endpoint |
| Over-fetching  | Yes                | No              |
| Under-fetching | Yes                | No              |
| Versioning     | Yes                | Not required    |

### Over Fetching in Rest

1. <b>Over Fetching </b> happens when an api returns <b>more data than you actually needs </b>

---

You're building a blog app and you just want to show the post title.

🔧 Example (REST):

```bash
GET post/1
```

Responses

```json
{
  "id": 1,
  "title": "GraphQL is Awesome",
  "content": "Full content of the blog...",
  "author": {
    "id": 22,
    "name": "Govind",
    "email": "govind@example.com"
  },
  "createdAt": "2025-04-24T10:00:00Z",
  "likes": 42
}
```

But you only needed the title. All the rest is just wasted data = over-fetching.

.

🕳️ Under-fetching in REST
Under-fetching happens when you don’t get all the data you need, so you have to make multiple requests.

🔧 Example (REST):
You want to show post title and the author name.

1. First you call:

```bash
GET /posts/1
```

Response

```json
{
  "id": 1,
  "title": "GraphQL is Awesome",
  "authorId": 22
}
```

2. Now you need author details, so you call:

```bash
GET /users/22
```

Response

```json
{
  "id": 22,
  "name": "Govind",
  "email": "govind@example.com"
}
```

You had to make two API calls to get all the data. That’s under-fetching.

✅ GraphQL Fixes Both
With GraphQL, you ask for exactly what you need in a single request.

🔧 GraphQL Query:

```graphql
{
  post(id: 1) {
    title
    author {
      name
    }
  }
}
```

Response

```json
{
  "data": {
    "post": {
      "title": "GraphQL is Awesome",
      "author": {
        "name": "Govind"
      }
    }
  }
}
```

✅ No over-fetching.
✅ No under-fetching.
✅ One request. Clean and efficient.

## 🛠 Setting Up GraphQL Server

- [ ] Initialize Node.js project
- [ ] Install dependencies (`apollo-server`, `graphql`)
- [ ] Create basic schema
- [ ] Set up resolvers
- [ ] Run a GraphQL server

---

## 🔍 Queries & Mutations

- [ ] Writing simple queries
- [ ] Writing mutations
- [ ] Passing arguments
- [ ] Nested queries

---

## 🧱 Schema & Types

- [ ] Defining `type`, `input`, `enum`, `scalar`
- [ ] Required fields
- [ ] Custom types

---

## 🧠 Resolvers

- [ ] What are resolvers?
- [ ] Resolver functions for fields
- [ ] Using context (auth, db)
- [ ] Async resolvers

---

## 🔌 Apollo Server (Node.js)

- [ ] Setup Apollo Server
- [ ] Connect to MongoDB/PostgreSQL
- [ ] Modularize schema & resolvers
- [ ] Error handling & validation

---

## 🧩 Apollo Client (React)

- [ ] Installing Apollo Client
- [ ] Setting up provider
- [ ] useQuery and useMutation hooks
- [ ] Fetching and displaying data
- [ ] Cache management

---

## 🔥 Advanced Topics

- [ ] Subscriptions (real-time data)
- [ ] Authentication with GraphQL
- [ ] Batching and Caching
- [ ] Pagination
- [ ] Fragments
- [ ] Directive (`@include`, `@skip`)
- [ ] Federation & Microservices

---

## 🛠 Mini Projects

- [ ] Basic User API (Query + Mutation)
- [ ] Notes App with Apollo Server
- [ ] React + Apollo Client Todo App
- [ ] Authentication with JWT

---

## 📚 Resources

- [Official GraphQL Docs](https://graphql.org/learn/)
- [Apollo GraphQL Docs](https://www.apollographql.com/docs/)
- [How to GraphQL (Interactive Tutorial)](https://www.howtographql.com/)
- [GraphQL Playground](https://github.com/graphql/graphql-playground)
- [Altair Client](https://altair.sirmuel.design/)

---

## ✅ Goals

- [ ] Learn core GraphQL concepts
- [ ] Build and deploy a full-stack GraphQL app
- [ ] Understand Apollo Server + Client deeply
- [ ] Be able to compare REST vs GraphQL confidently

---

## 💬 Notes

Keep updating this section with your personal learnings, doubts, and “aha!” moments 💡.
