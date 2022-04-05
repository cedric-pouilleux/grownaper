// eslint-disable-next-line
function isEqual(...objects: any) {
  return objects.every(
    // eslint-disable-next-line
    (obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0]),
  );
}

function Percent(a: number, b: number): number {
  if (a === 0) {
    return 0;
  }
  return Math.round((a / b) * 100);
}

export {
  isEqual,
  Percent,
};
