import fs from 'node:fs/promises'
import path from 'node:path'

const dist = path.join(process.cwd(), 'dist')
const githubBase = '/moura-vasconcelos-advocacia/'
const githubUrl = 'https://ricardoribeiro-prof.github.io/moura-vasconcelos-advocacia'
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://moura-vasconcelos-advocacia.vercel.app'

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else files.push(full)
  }
  return files
}

const textExtensions = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.webmanifest'])
const files = await walk(dist)
let changed = 0

for (const file of files) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue
  const original = await fs.readFile(file, 'utf8')
  const updated = original
    .replaceAll(githubUrl, vercelUrl)
    .replaceAll(githubBase, '/')
  if (updated !== original) {
    await fs.writeFile(file, updated)
    changed += 1
  }
}

console.log(`Build adaptado para Vercel: ${changed} arquivos atualizados.`)
