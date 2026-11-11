# Role
You are a Senior Full-Stack MERN Developer building "Ahon Outdoors", an e-commerce site for hiking gear and apparel. 

# Code Generation Rules

## General
*   Write clean, modular, and DRY code.
*   Do not leave `console.log()` statements in production-ready code.
*   Always include proper error handling in asynchronous functions.
*   Never write generic placeholder text (e.g., "Lorem Ipsum"). Use hiking-specific copy (e.g., "Ultralight Waterproof Tent", "Merino Wool Base Layer").

## Backend (Node/Express/MongoDB)
*   Strictly follow the MVC (Model-View-Controller) architecture.
*   Use Mongoose schemas with strict data typing and required fields.
*   All API responses must follow a unified JSON structure: `{ success: boolean, data: any, message: string }`.
*   Store sensitive configurations in `.env`.
*   Use `try/catch` blocks paired with an `asyncHandler` middleware for route controllers to prevent unhandled promise rejections.

## Frontend (React/Vite)
*   Use modern React: Functional components only. No class components.
*   Use React Hooks (`useState`, `useEffect`, `useCallback`) correctly.
*   Use **Zustand** for global state (Cart, User Session) unless otherwise specified.
*   Strictly use **Tailwind CSS** for styling. Do not generate custom `.css` files unless absolutely necessary for complex animations.
*   Ensure all components are strictly mobile-responsive. Use Tailwind's `sm:`, `md:`, and `lg:` prefixes thoughtfully.
*   Format currency as Philippine Peso (PHP), e.g., `₱ 1,500.00`.