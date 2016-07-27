export const addProduct = (text) => {
  return {
    type: 'ADD_PRODUCT',
    id: nextProduct++,
    text
  }
}
