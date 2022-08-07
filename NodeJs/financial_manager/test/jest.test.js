test('Devo conhecer as principais assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalharcom objetos', () => {
  const obj = {
    name: 'John',
    mail: 'johndoe@example.com',
  };
  expect(obj).toHaveProperty('name', 'John');
  expect(obj.name).toBe('John');

  const obj2 = {
    name: 'John',
    mail: 'johndoe@example.com',
  };

  expect(obj).toEqual(obj2);
});
