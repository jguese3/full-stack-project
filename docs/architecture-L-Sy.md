# Architectural Layout Document

## Overview

This document describes my contributions to the Sprint 3 layered architecture:

- Hook: `useUserGames`
- Service: `userGamesService`
- Repository: `gameRepository`

---

## Hook: `useUserGames`

### 1. What does this hook do?

- It manages user-library presentation state by loading games, filtering by title, and provides methods to add games, remove games, and update game status.

### 2. Why is this logic in a hook?

- This logic belongs in a hook because it is reusable presentation logic. Centralizing it here prevents duplicated logic and keeps components focused on rendering.

### 3. Where is this used and how?

- `allGames.tsx` uses this to add games from the full catalog to the user's library while `userGameList.tsx` uses it to display filtered games, update game status and remove games from the library.
- Both components call hook methods instead of doing or implementing them locally.

---

## Service: `userGamesService`

### 1. What does this service do?

- It validates status updates, prevents duplicate adds of the same game, and forces the status "backlog" to the added game.

### 2. Why is this logic in a service?

- This logic belongs in a service because it defines business rules (status validation, duplicate prevention, default status on add). Keeping them in one place ensures consistency across components and hooks

### 3. Where is this used and how?

- It is used by `useUserGames.ts`, which calls service methods before updating React state in the UI.

---

## Repository: `gameRepository`

### 1. What does this repository do?

- `gameRepository.ts` handles data access for the user library by providing CRUD operations (fetch, add, update, remove) using test data.

### 2. Why is this logic in a repository?

- This logic belongs in a repository because it isolates data-access concerns from UI and business-rule concerns.
- It makes future migration from test data to backend API calls easier.

### 3. Where is this used and how?

- It is used by `userGamesService.ts` to read and mutate user-library data.
- It currently uses `tempUserGames.tsx` as the test data source.
