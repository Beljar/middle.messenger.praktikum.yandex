export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'short',
  });
};
