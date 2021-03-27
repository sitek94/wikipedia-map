// Kent's article about using CSS Variables and React Context
// https://epicreact.dev/css-variables

/**
 * Converts the nested theme object with theme values into one with
 * the theme variables as the value
 */
export function toVarNames(themeObj, prefix = '-') {
  const vars = {}

  for (const [key, value] of Object.entries(themeObj)) {
    if (typeof value === 'object') {
      vars[key] = toVarNames(value, `${prefix}-${key}`)
    } else {
      vars[key] = `var(${prefix}-${key})`
    }
  }

  return vars
}

/**
 * Converts the nested theme object into a flat object with
 * `--path-to-value` keys
 */
export function toVars(themeObj, prefix = '-') {
  const vars = {}

  for (const [key, value] of Object.entries(themeObj)) {
    if (typeof value === 'object') {
      const nestedVars = toVars(value, `${prefix}-${key}`)

      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue
      }
    } else {
      vars[`${prefix}-${key}`] = value
    }
  }

  return vars
}
