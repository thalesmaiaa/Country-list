/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */

type CurrencyObject = {
  name: string
  symbol: string
}

export function formatCurrency(currencyObj: any) {
  const flattenedObject: CurrencyObject = {} as CurrencyObject

  for (const key in currencyObj) {
    if (currencyObj.hasOwnProperty(key)) {
      Object.assign(flattenedObject, currencyObj[key])
    }
  }

  return `${flattenedObject?.name} - ${flattenedObject?.symbol}`
}
