# Sticky notes

Built with React, TypeScript, and Vite.

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check and produce a production build
```

## Architecture

State management is handled entirely inside the `useNotesStore` hook, which wraps a `useReducer` with a typed `Action` union (`ADD`, `MOVE`, `RESIZE`, `BRING_TO_FRONT`, `REMOVE`).
Notes are persisted automatically to `localStorage` via `loadNotes` / `saveNotes` utilities, so the store is the single source of truth for the whole application.

Drag interaction is factored out into the generic `useDrag` hook, which records a start position on `pointerdown`, emits relative `dx`/`dy` deltas on every `pointermove`, and commits on `pointerup`.
Both moving and resizing a note reuse this same hook with different callbacks.

## Implemented features

1. ✅ Create a new note of the specified size at the specified position.
2. ✅ Change note size by dragging.
3. ✅ Move a note by dragging.
4. ✅ Remove a note by dragging it over a predefined "trash" zone.
5. ❌ Entering/editing note text.
6. ✅ Moving notes to front (in case of overlapping notes).
7. ✅ Saving notes to local storage (restoring them on page load).
8. ✅ Different note colors.
9. ❌ Saving notes to REST API. Note: you're not required to implement the API, you can mock it, but the mocks should be asynchronous.

