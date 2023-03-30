const generateName = (name: string) => {
  let kname = name.replace(/[^A-Z0-9]/ig, '').toLowerCase()
  kname = `${kname}${Math.floor(Math.random() * 9999)}`
  return kname
}

export default generateName
