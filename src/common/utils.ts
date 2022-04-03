// eslint-disable-next-line
function isEqual(...objects: any) {
  return objects.every(
    // eslint-disable-next-line
    (obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0]),
  );
}

export {
  // eslint-disable-next-line import/prefer-default-export
  isEqual,
};
