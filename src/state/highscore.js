const STORAGE_KEY = "bestScore";

export function getBestScore() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function maybeSetBestScore(score, total) {
  const best = getBestScore();
  if (!best || score > best.score) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, total }));
    return true; // new high score
  }
  return false;
} 