const { X_OK } = require('constants');
const fs = require('fs'), prompt = require('prompt'), { createCanvas, loadImage } = require('canvas')
prompt.start()
console.log('enter emotes directory name')
prompt.get(['dir', 'RepoName'], async (err, result) => {
  let emoteDir = result.dir
  let folder = fs.readdirSync(`./${emoteDir}`)
  let jsonStructure = 
  {
    "name":`${result.RepoName}`,
    "path":`${emoteDir}`,
  }
  let emotes = new Array()
  folder.forEach(file => {
    let info = file.split('.')
    emotes.push(
      {
        "name":`${info[0]}`,
        "type":`.${info[1]}`
      }
    )
  })
  jsonStructure["emotes"] = emotes
  fs.writeFileSync('./index.json', JSON.stringify(jsonStructure), 'utf8');
  console.log('Wrote table to index.json')

  folder.forEach(x => {
    folder[folder.indexOf(x)] = `./${emoteDir}/${x}`
  })
  folder.forEach(x => {
    if (!(x.toLowerCase().endsWith('jpeg') || x.toLowerCase().endsWith('jpg') || x.toLowerCase().endsWith('png') )) return console.log(`Invalid file found at ${x}`)
    let ext
    if (x.toLowerCase().endsWith('jpeg') || x.toLowerCase().endsWith('jpg')) ext = 'jpeg'
    if (x.toLowerCase().endsWith('png')) ext = 'png'
    let slicelen 
    if (x.toLowerCase().endsWith('jpeg')) slicelen = 4
    else slicelen = 3
    console.log(x)
    const canvas = createCanvas(48, 48)
    const ctx = canvas.getContext('2d')
    loadImage(x).then((image) => {
      ctx.drawImage(image, 0, 0, 48, 48)
    })
    const buff = canvas.toBuffer(`image/${ext}`)
    let filename = `${x.slice(0, x.length-slicelen)}${ext}`
    console.log(filename)
    fs.writeFileSync(filename, buffer)
  })
  return
})
