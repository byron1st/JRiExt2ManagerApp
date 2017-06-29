import fs from 'fs'
import path from 'path'

export default JSON.parse(fs.readFileSync(path.join(__dirname, 'app.mode.json')).toString()).mode === 'test'
