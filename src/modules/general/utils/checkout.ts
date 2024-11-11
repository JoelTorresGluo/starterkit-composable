export const createHiddenField = (field: string, value: string) => {
  let input = document.createElement('input')
  input.type = 'hidden'
  input.name = field
  input.value = value ?? ''
  return input
}
