# Architectural Layout Document

## Overview
This document describes my contributions to the Sprint 3 architecture:

- **Hook**: `useGameReview`
- **Hook**: `useReviewAndCommentForm`
- **Service**: `gameReviewService`
- **Service**: `reviewCommentService`
- **Repository**: `reviewRepository`
- **Repository**: `commentRepository`

---

## Hook: useGameReview

### 1. What does this hook do?
`useGameReview` manages all the state for the game review page. It keeps track of:
- The list of reviews (either all of them or just ones for a specific game)
- The search bar for finding games to review
- Which review is selected for showing comments
- Filters (from clicking a game on the All Games page or using the search)
- Refreshing the review list when someone adds a new review

### 2. Why is this logic in a hook?
I put this in a hook to keep all the review page state in one place. This makes the `GameReview` component much simpler - it just displays stuff instead of managing a bunch of state. The hook takes care of:
- Keeping track of all the different pieces of state (which review is open, what's in the search box, etc.)
- Making sure the component stays clean and easy to read
- Letting me reuse this logic if I need another review page later
- Calling service functions for things like filtering and sorting (the hook tells them what to do, not how to do it)

### 3. Where is this used and how?
**Used in**: `src/components/GameReview/GameReview.tsx`

**How**: The `GameReview` component just calls this hook and grabs everything it needs:
```typescript
const {
  searchTerm,
  setSearchTerm,
  appliedSearchTerm,
  activeGameId,
  reviewList,
  applySearch,
  handleReviewAdded,
  handleResetAll,
  getGameTitle,
  selectedReviewId,
  setSelectedReviewId,
} = useGameReview();
```

The hook uses:
- `gameReviewService` - for things like looking up game titles, filtering reviews, and sorting
- `useSelectedGameFilter` hook - for keeping track of which game was clicked from the All Games page
- `reviewRepository` - for getting reviews from storage

---

## Hook: useReviewAndCommentForm

### 1. What does this hook do?
`useReviewAndCommentForm` manages the form for both reviews and comments. It takes care of:
- The form fields (username, text, and rating for reviews)
- Showing the list of comments (when it's a comment form)
- Checking if the user filled everything out
- Submitting the form and saving the data
- Clearing the form after it's submitted
- Making sure comments show newest first

### 2. Why is this logic in a hook?
I made this a hook because the same form is used for both reviews and comments, just with slightly different fields. Having it as a hook means:
- The `ReviewAndCommentForm` component just displays the form without worrying about how it works
- I can reuse this form logic anywhere I need it
- All the validation and submission stuff happens in one place
- The component doesn't need to know about how data gets saved

### 3. Where is this used and how?
**Used in**: `src/components/formcomments/ReviewAndCommentForm.tsx`

**How**: The form component passes in what type of form it is (review or comment) and gets back everything it needs:
```typescript
const {
  commentList,
  username,
  setUsername,
  text,
  setText,
  rating,
  setRating,
  submitForm,
} = useReviewAndCommentForm(props);
```

The hook uses:- for checking if fields are filled out, creating reviews/comments, and sorting
- `commentRepository` - for getting and saving comments
- `reviewRepository` - for saving reviews

---

## Service: gameReviewService

### 1. What does this service do?
`gameReviewService` has helper functions for working with game reviews:
- **Get game title**: `getGameTitleById(gameId)` - looks up the game name, or says "Unknown Game" if not found
- **Search for games**: `findMatchingGameId(searchTerm)` - finds the first game that matches what you typed
- **Filter reviews**: `filterReviewsByGameId(reviews, gameId)` - gets only the reviews for a specific game
- **Sort reviews**: `sortReviews(reviews)` - puts reviews in order from newest to oldest

### 2. Why is this logic in a service?
I put this in a service because it's just regular JavaScript functions that don't need React or UI stuff. It's better in a service because:
- It doesn't use any React hooks or components
- I can use it in different parts of my app
- Everyone gets the same behavior (like always showing "Unknown Game" for bad IDs)
- I can test it without having to render anything
- It separates the "what to do" (business rules) from the "how to display it" (UI) and "where to get it" (data)

### 3. Where is this used and how?
**Used in**: `src/hooks/useGameReview.ts`

**How**: The hook imports these functions and uses them
**How**: The hook imports and calls service functions throughout its logic:
```typescript
import {
  filterReviewsByGameId,
  findMatchingGameId,
  getGameTitleById,
  sortReviews,
} from "../services/gameReviewService";

// Examples:
const getGameTitle = (id: number): string => getGameTitleById(id);
const reviewList = sortReviews(filterReviewsByGameId(allReviews, activeGameId));
setSelectedGameFromSearch(findMatchingGameId(nextSearchTerm));
```

The service uses:
- `tempGames` - the list of games to search through
- `Review` type - so TypeScript knows what a review looks like

---

## Service: reviewCommentService

### 1. What does this service do?
`reviewCommentService` has helper functions for reviews and comments:
- **Check form input**: `validateReviewOrCommentInput(username, text)` - makes sure the user filled out the fields
- **Format dates**: `formatDisplayDate()` - creates dates that look the same everywhere (like "Mar 1, 2026")
- **Make comment IDs**: `getNextCommentId(existingComments)` - figures out the next ID number to use
- **Build entities**: `buildComment(params)` and `buildReview(params)` - creates new comment/review objects
- **Sort comments**: `sortComments(comments)` - puts comments in order from newest to oldest

### 2. Why is this logic in a service?
I put this in a service because it's reusable logic that doesn't need React or UI stuff:
- All forms use the same validation, so it's consistent everywhere
- Creating reviews/comments with the right format happens in one place
- No React or data storage code mixed in
- I can use it in different forms if I need to
- Easy to test - just pass in some data and check what comes out
- Dates and IDs are always generated the same way

### 3. Where is this used and how?
**Used in**: `src/hooks/useReviewAndCommentForm.ts`

**How**: The hook uses these functions when someone submits the form:
```typescript
import {
  buildComment,
  buildReview,
  sortComments,
  validateReviewOrCommentInput,
} from "../services/reviewCommentService";

// Examples:
validateReviewOrCommentInput(username, text); // throws error if invalid
const newComment = buildComment({ reviewId, username, text, existingComments });
const newReview = buildReview({ gameId, username, text, rating });
setCommentList(prev => sortComments([...prev, newComment]));
```

The service uses:
- `Comment` and `Review` types - so TypeScript knows how to structure the data

---

## Repository: reviewRepository

### 1. What does this repository do?
`reviewRepository` handles all the review data storage. It has functions to:
- **Get all reviews**: `fetchAllReviews()` - gives you every review
- **Get one review**: `fetchReviewById(reviewId)` - finds a specific review (or returns undefined if not found)
- **Add a review**: `addReview(newReview)` - saves a new review
- **Update a review**: `updateReview(reviewId, updates)` - changes an existing review
- **Delete a review**: `removeReview(reviewId)` - removes a review

### 2. Why is this logic in a repository?
I put this in a repository to keep all the data stuff separate:
- Right now it's just an array in memory, but later I could swap it for a real database without changing anything else
- Everyone uses the same functions to get/save data
- The rest of my code doesn't need to know HOW the data is stored, just that it can get it
- All the low-level array operations (finding, adding, removing) are hidden here

### 3. Where is this used and how?
**Used in**: `src/hooks/useGameReview.ts`, `src/hooks/useReviewAndCommentForm.ts`

**How**: The hooks call these functions whenever they need review data:
```typescript
import { fetchAllReviews } from "../apis/reviewRepository";
import { addReview } from "../apis/reviewRepository";

// Examples in useGameReview:
const [allReviews, setAllReviews] = useState(sortReviews(fetchAllReviews()));
setAllReviews(sortReviews(fetchAllReviews())); // refresh after add

// Examples in useReviewAndCommentForm:
const newReview = buildReview({ gameId, username, text, rating });
addReview(newReview);
```

The repository manages:
- In-memory `reviews` array (initialized from test data)
- An array of reviews in memory (starts with some test data)
- Error messages when you try to find a review that doesn't exist

---

## Repository: commentRepository

### 1. What does this repository do?
`commentRepository` handles all the comment data storage. It has functions to:
- **Get all comments**: `fetchAllComments()` - gives you every comment
- **Get comments for a review**: `fetchCommentsByReviewId(reviewId)` - gets all comments on a specific review
- **Add a comment**: `addComment(newComment)` - saves a new comment
- **Update a comment**: `updateComment(commentId, updates)` - changes an existing comment
- **Delete a comment**: `removeComment(commentId)` - removes a comment

### 2. Why is this logic in a repository?
I put this in a repository for the same reasons as the review repository:
- Right now it's just an array, but I could change it to use a database later
- Everyone uses the same functions to work with comment data
- The rest of my code doesn't care where comments are stored
- All the filtering and array work happens here

### 3. Where is this used and how?
**Used in**: `src/hooks/useReviewAndCommentForm.ts`

**How**: The hook calls these functions to work with comments
```typescript
import { 
  addComment, 
  fetchAllComments, 
  fetchCommentsByReviewId 
} from "../apis/commentRepository";

// Examples:
// Initial load (comment form only):
const [commentList, setCommentList] = useState(
  config.type === "comment"
    ? sortComments(fetchCommentsByReviewId(config.reviewId))
    : []
);

// For ID generation:
const existing = fetchAllComments();
const newComment = buildComment({ reviewId, username, text, existingComments: existing });

// Persist:
addComment(newComment);
```

The repository manages:
- In-memory `comments` array (initialized from test data)
- Error handling for not-found cases
An array of comments in memory (starts with some test data)
- Error messages when you try to find a comment that doesn't exist