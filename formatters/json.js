export default (diff) => {
  const result = {
    name: 'difference',
    status: 'internal-values',
    children: diff,
  };
  return JSON.stringify(result, null, '  ');
};
