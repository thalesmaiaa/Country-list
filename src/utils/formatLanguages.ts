type Props = {
  [key: string]: object
}

export function formatLanguages(languagesObj: Props) {
  const languages = []

  for (const key in languagesObj) {
    languages.push(languagesObj[key])
  }

  return languages.join(', ')
}
