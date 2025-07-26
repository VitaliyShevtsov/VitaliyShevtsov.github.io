export function useGetLocalTime() {
  return (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    });
  };
}
