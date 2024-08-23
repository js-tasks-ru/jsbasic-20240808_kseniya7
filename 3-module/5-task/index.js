function getMinMax(str) {
  const elements = str.split(' ');
  const numbers = elements
    .map(item => Number(item))
    .filter(item => !isNaN(item));
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}
