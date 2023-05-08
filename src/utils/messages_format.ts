export function replaceTextByVariables (text: string, variables: { [key: string]: string }): string {
  // Crea una expresión regular para buscar las variables en el texto
  const variableRegex = /\{\{([\w]+)\}\}/g

  // Usa la función replace() para buscar y reemplazar las variables
  const replacedText = text.replace(variableRegex, (match, variableName) => {
    // Si la variable se encuentra en el objeto de variables, la reemplaza, en caso contrario, la deja tal cual
    return variables.hasOwnProperty(variableName) ? variables[variableName] : match
  })

  // Devuelve el texto con las variables reemplazadas
  return replacedText
}
