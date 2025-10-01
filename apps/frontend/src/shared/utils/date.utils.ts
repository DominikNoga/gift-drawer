export const formatDate = (date: Date | string | undefined) => {
  if (!date || date === '') return 'N/A';
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
