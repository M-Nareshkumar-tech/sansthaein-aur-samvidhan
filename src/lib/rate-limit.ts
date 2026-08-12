const tracker = new Map<string, number[]>();

/**
 * Validates request threshold counts for a given identifier (IP/userId) over a window.
 * @param identifier The target key (IP address or user ID).
 * @param limit Maximum number of allowed requests in the time frame.
 * @param windowMs Time window in milliseconds.
 * @returns boolean True if allowed, false if limit is exceeded.
 */
export function checkRateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  
  if (!tracker.has(identifier)) {
    tracker.set(identifier, [now]);
    return true;
  }
  
  const timestamps = tracker.get(identifier)!;
  
  // Filter timestamps to only retain ones falling within the window
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (validTimestamps.length >= limit) {
    tracker.set(identifier, validTimestamps);
    return false;
  }
  
  validTimestamps.push(now);
  tracker.set(identifier, validTimestamps);
  return true;
}
