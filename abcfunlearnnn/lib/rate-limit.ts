export function rateLimit(options: {
  interval: number;
  uniqueTokenPerInterval: number;
}) {
  const tokens = new Map<string, number[]>();

  return {
    check: (limit: number, token: string) => {
      const now = Date.now();
      const timeWindow = options.interval;

      if (!tokens.has(token)) {
        tokens.set(token, []);
      }

      const timestamps = tokens.get(token)!;
      const validTimestamps = timestamps.filter((ts) => now - ts < timeWindow);

      if (validTimestamps.length >= limit) {
        return true; // Rate limited
      }

      validTimestamps.push(now);
      tokens.set(token, validTimestamps);

      // Cleanup old timestamps
      setTimeout(() => {
        const currentTimestamps = tokens.get(token) || [];
        const updatedTimestamps = currentTimestamps.filter(
          (ts) => now - ts < timeWindow
        );
        if (updatedTimestamps.length === 0) {
          tokens.delete(token);
        } else {
          tokens.set(token, updatedTimestamps);
        }
      }, timeWindow);

      return false; // Not rate limited
    },
  };
}
