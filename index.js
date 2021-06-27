const fs = require('fs'), prompt = require('prompt');
prompt.start()
console.log('enter emotes directory name')
prompt.get(['dir', 'RepoName'], (err, result) => {
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
        "type":`${info[1]}`
      }
    )
  })
  jsonStructure["emotes"] = emotes
  fs.writeFileSync('./index.json', JSON.stringify(jsonStructure), 'utf8');
  console.log('Wrote table to index.json')
  return
});
