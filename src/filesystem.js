import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

export const getFiles = async ({ dirname }) => {
  const filenames = await readdir(dirname)
  const files = filenames.map(filename => {
    const pathname = path.join(dirname, filename)
    const isDirectory = fs.statSync(pathname).isDirectory()
    const ext = path.extname(filename)
    return {
      filename,
      pathname,
      ext,
      isDirectory
    }
  })
    .filter(file => file.isDirectory || /\.(md|mdx)$/.test(file.ext))
    .filter(file => !file.filename.startsWith('.'))

  return files
}

export const getFile = async filename => {
  if (!filename) return
  const code = await readFile(filename)
  return code
}
