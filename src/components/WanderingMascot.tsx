"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Mascot, MascotMood } from "./Mascot";

const MASCOT_SIZE = 64;
const EDGE_MARGIN = 20;
// The mascot roams a strip along the bottom of the screen rather than the
// full viewport, so it never wanders over the task content itself.
const BOTTOM_BAND_HEIGHT = 150;
const MIN_PAUSE_MS = 3200;
const MAX_PAUSE_MS = 6000;
const WALK_DURATION_MS = 2400;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * A free-roaming version of the mascot that ambles to random spots on
 * screen. Click-through (pointer-events: none) so it never blocks the
 * task the learner is actually working on.
 */
export function WanderingMascot({
  mood = "happy",
  active = true,
}: {
  mood?: MascotMood;
  active?: boolean;
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [target, setTarget] = useState({
    x: EDGE_MARGIN,
    y: EDGE_MARGIN,
    facingLeft: false,
  });
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    if (!active || reduceMotion) return;

    let pauseTimeout: ReturnType<typeof setTimeout>;
    let walkTimeout: ReturnType<typeof setTimeout>;

    const scheduleWander = () => {
      pauseTimeout = setTimeout(() => {
        const maxX = Math.max(EDGE_MARGIN, window.innerWidth - MASCOT_SIZE - EDGE_MARGIN);
        const maxBottom = Math.max(
          EDGE_MARGIN,
          Math.min(BOTTOM_BAND_HEIGHT, window.innerHeight - MASCOT_SIZE - EDGE_MARGIN)
        );
        const nextX = randomBetween(EDGE_MARGIN, maxX);
        const nextY = randomBetween(EDGE_MARGIN, maxBottom);

        setTarget((prev) => ({ x: nextX, y: nextY, facingLeft: nextX < prev.x }));
        setWalking(true);
        walkTimeout = setTimeout(() => setWalking(false), WALK_DURATION_MS);
        scheduleWander();
      }, randomBetween(MIN_PAUSE_MS, MAX_PAUSE_MS));
    };

    scheduleWander();

    return () => {
      clearTimeout(pauseTimeout);
      clearTimeout(walkTimeout);
    };
  }, [active, reduceMotion]);

  if (!active) return null;

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="fixed bottom-5 right-5 z-20"
        style={{ width: MASCOT_SIZE, height: MASCOT_SIZE }}
      >
        <Mascot mood={mood} className="h-full w-full drop-shadow-lg" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="mascot-wander z-20"
      style={{
        left: target.x,
        bottom: target.y,
        width: MASCOT_SIZE,
        height: MASCOT_SIZE,
        transform: target.facingLeft ? "scaleX(-1)" : undefined,
      }}
    >
      <Mascot
        mood={mood}
        className={`h-full w-full drop-shadow-lg ${walking ? "mascot-wander-bob" : ""}`}
      />
    </div>
  );
}
