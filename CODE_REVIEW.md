# Are there any problems or code smells in the app?
When we clear the search input and enter any letter, it is showing previous data and then displaying new results after clicking search  - Fixed

# Are there other improvements you would make to the app? What are they and why?
Added spinner as data loading taking time when there are more results. 

# In Google Chrome, run an automated scan with the Lighthouse extension. Lighthouse, note these issues.
     Buttons do not have an accessible name - Fixed
# In Chrome again, manually check for accessibility issues. Identify at least 3 issue, not found in the automated scan.
 1. Added accessibility to the title of the book, author name
 2. Images should have alt attribute - Fixed

# Lint errors 
After gave a fix for one of the observation noticed below error
ERROR: D:/Puzzle/New folder/web-ui-developer-puzzle-master/libs/books/feature/src/lib/book-search/book-search.component.ts:33:34 - == should be ===  Fixed.

# Testcases
  FAIL  libs/books/data-access/src/lib/+state/reading-list.reducer.spec.ts (16.701s); - Fixed

# E2E
 1 failing

  1) When: Use the search feature
       Then: I should be able to search books by title: At least one book - Fixed

