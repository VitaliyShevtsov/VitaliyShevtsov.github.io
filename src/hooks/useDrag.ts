import { useRef, useCallback } from "react";

interface UseDragOptions {
  onDragStart: (e: PointerEvent) => void;
  onDragMove: (dx: number, dy: number, e: PointerEvent) => void;
  onDragEnd: (e: PointerEvent) => void;
}

interface StartPosition {
  readonly x: number;
  readonly y: number;
}

export function useDrag({
  onDragStart,
  onDragMove,
  onDragEnd,
}: UseDragOptions) {
  const startPos = useRef<StartPosition | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();

      const target = e.currentTarget as HTMLElement;

      target.setPointerCapture(e.pointerId);
      startPos.current = { x: e.clientX, y: e.clientY };

      onDragStart(e.nativeEvent);

      const onMove = (ev: PointerEvent) => {
        if (!startPos.current) {
          return;
        }

        const dx = ev.clientX - startPos.current.x;
        const dy = ev.clientY - startPos.current.y;

        onDragMove(dx, dy, ev);
      };

      const onUp = (ev: PointerEvent) => {
        startPos.current = null;

        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onUp);

        if (onDragEnd) {
          onDragEnd(ev);
        }
      };

      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
      target.addEventListener("pointercancel", onUp);
    },

    [onDragStart, onDragMove, onDragEnd],
  );

  return handlePointerDown;
}
