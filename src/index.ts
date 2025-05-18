/**
 * Root entry point for the library.
 *
 * Re-exports all v2 functionality directly while also providing the same set of
 * exports under the `v2` namespace.
 */
export * from "./v2"; // Current default export
export * as v2 from "./v2";
