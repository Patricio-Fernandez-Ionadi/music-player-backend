require('dotenv').config()
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const ms = require('mediaserver')

const app = express()
const PORT = process.env.PORT || 1234

app.use(express.json())
app.use(cors())

app.get('/api/songs', (req, res) => {
  fs.readFile(path.join(__dirname, './songs.json'), 'utf8', (err, songs) => {
    if (err) throw err
    // res.json(songs) // --> "[\r\n  {\r\n    \"name\": \"Fe\"\r\n  },\r\n  {\r\n    \"name\": \"malajunta\"\r\n  }\r\n]\r\n"
    res.json(JSON.parse(songs))
  })
})

app.get('/api/songs/:name', (req, res) => {
  const song = `${__dirname}/media/${req.params.name}.mp3`

  ms.pipe(req, res, song, 'audio/mpeg')
})

app.listen(PORT, () => console.log('sv on port:', PORT))
