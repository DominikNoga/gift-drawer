export const cacheValue = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getCachedValue = <T>(key: string): T | null => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

export const clearCachedValue = (key: string) => {
  localStorage.removeItem(key);
};
