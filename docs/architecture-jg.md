# Architectural Layout Document

## Author: Jarone Guese
## Last Updated: March 01, 2026

This document explains the architecture for the **User & Search features**: repositories, services, and hooks.  

It covers:  
1. What each module is responsible for  
2. Why its logic is placed where it is  
3. Where it is used in the application  

---

## Repositories

### `usersRepository.ts`

**What it does**  
- Serves as the data-access layer for user-related operations.  
- Provides CRUD-like functions on the temporary userData array.  
- Exposes:  
  - etchUsers() 
  - getUserById(userId)
  - followUser(userId) / unfollowUser(userId)  

**How logic is separated**  
- Only manages data fetching and updates, no business rules.  
- Keeps this layer independent and reusable across services or UI components.  

**Where it’s used**  
- Exclusively called by userService.ts.  
- Never accessed directly by React components or hooks.  

---

## Services

### `userService.ts`

**What it does**  
- Implements business rules and decision-making for users.  
- Exposes:  
  - `fetchUsers()` — retrieves all users from the repository  
  - `toggleFollowUser(userId)` — decides whether to follow or unfollow a user based on current state  

**How logic is separated**  
- Services handle why and when data changes occur.  
- Example: toggleFollowUser evaluates a user's current isFollowing state before calling the repository method.  
- Keeps the repository focused purely on data manipulation.  

**Where it’s used**  
- Utilized by useUser hook to perform user actions while managing state.  
- Allows components to remain free from conditional logic for following/unfollowing.  

---

### `searchService.ts`

**What it does**  
- Encapsulates validation rules for user search input.  
- Exposes:  
  - validateSearch(searchValue) — validates search criteria (minimum length for now..)  

**How logic is separated**  
- Handles only validation rules, not UI state or side-effects.  
- Keeps UI concerns and validation logic decoupled.  

**Where it’s used**  
- Called by useSearch hook before performing a search operation.  
- Makes sure components only deal with valid search input.  

---

## Hooks

### `useUser`

**What it does**  
- Custom hook that manages user state in the UI.  
- Fetches users, applies optional filtering, and exposes toggleFollow for follow/unfollow actions.  
- Delegates business operations to userService.ts.  

**How logic is separated**  
- Handles React-specific concerns: state, side-effects, error handling.  
- Separates all business rules (like deciding follow/unfollow) to the service layer.  

**Where it’s used**  
- Used by components such as Following.tsx to:  
  - Retrieve the list of users  
  - Apply optional filters (e.g., only followed users)  
  - Trigger follow/unfollow actions without embedding complex logic in UI  

---

### `useSearch`

**What it does**  
- Custom hook managing search input state.  
- Validates search queries using searchService.  
- Exposes searchValue, setSearchValue, and trySearch() for validation results.  

**How logic is separated**  
- Deals solely with UI concerns (state updates, input handling).  
- Passes validation rules to the service layer.  

**Where it’s used**  
- Components like Search.tsx rely on this hook to:  
  - Track search input  
  - Validate user queries before filtering results  
  - Keep UI code clean and free from validation logic  

---
