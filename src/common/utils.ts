function isEqual(...objects: any) {
  return objects.every(
    (obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0]),
  );
}

export {
  // eslint-disable-next-line import/prefer-default-export
  isEqual,
};
