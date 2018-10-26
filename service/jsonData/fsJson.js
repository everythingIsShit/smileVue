
const fs = require('fs')

fs.readFile('./jsonData/json/goods.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.forEach(value => {
    if (value.IMAGE1 !== null) {
      i++
      pushData.push(value)
    }
  })
  console.log(i)
  fs.unlink('./jsonData/json/newGoods.json')
  fs.writeFile('./jsonData/json/newGoods.json', JSON.stringify(pushData), err => {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
