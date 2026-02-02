/**
 * API Layer - Modular by Feature
 *
 * This file exports all API modules organized by feature.
 * Each feature should have its own directory with:
 * - types.ts (TypeScript types/interfaces)
 * - service.ts (API service functions)
 * - hooks.ts (React hooks for data fetching, optional)
 */

// Re-export the base client
export * from './client';

// Export feature APIs
export * from './features/auth';
export * from './features/users';
export * from './features/games';
export * from './features/rankings';
export * from './features/statistics';
