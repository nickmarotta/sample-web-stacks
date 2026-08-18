# Service layer for business logic isolation

The app is built with TanStack Start using React components and server functions, but all game logic lives in Services — server functions only translate between HTTP and the service layer, and components only handle rendering. No logic in components beyond display concerns, no logic in server functions beyond input validation and response shaping. This keeps business logic portable, testable, and decoupled from the TanStack Start runtime.

## Considered options

- Logic in server functions (common default, ruled out — locks logic to HTTP lifecycle)
- Logic in components/hooks (ruled out — ties domain logic to rendering concerns)
- Service layer (chosen — portable, testable, framework-agnostic)
