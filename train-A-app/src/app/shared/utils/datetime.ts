export const formatDuration = (timestamp: number) => {
  let duration = '';

  const minutes = Math.floor(timestamp / (1000 * 60));
  const m = minutes % 60;
  const hours = Math.floor(minutes / 60);
  const h = hours % 24;
  const days = Math.floor(hours / 24);
  const d = days % 365;
  duration = d ? `${d}d ` : '';
  duration += h ? `${h}h ` : '';
  duration += m ? `${m}m` : '';
  return duration;
};
