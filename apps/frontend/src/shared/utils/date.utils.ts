export const formatDate = (date: Date | string | undefined, withTime = false) => {
  if (!date || date === '') return 'N/A';

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(withTime ? timeFormat : {}),
  });
};
