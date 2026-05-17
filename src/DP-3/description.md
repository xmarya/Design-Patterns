Practice 3 — The Query Builder
### Context: You're building an internal dashboard with a dynamic filter panel. Users can filter a dataset by date range, status, category, and keyword — in any combination.

### Problem: The current implementation builds SQL/ORM queries using a growing chain of if statements. Design a composable query construction mechanism where each filter is an independent, stackable unit — and the final query assembles itself from whatever filters are active.

## My Solution:
The right DP to choose is ~~the Builder; the keywords that led me were: dynamic filter, each is an independent and can be in any combination~~ the Composite. I should've realised that the Builder is the wrong choice from the word "Design a composable query, independent and stackable unit". The Builder's methods aren't independent unit. And ABOVE of that, the main purpose of the Builder to to facilitate the creation of a COMPLEX object, while COMPOSABLE pointing at something "structural" that can be combined at any order and in any shape, like the coloured building blocks toy.