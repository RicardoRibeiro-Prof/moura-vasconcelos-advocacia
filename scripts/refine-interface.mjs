import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const basePath = '/moura-vasconcelos-advocacia/'

async function listHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await listHtmlFiles(absolute))
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(absolute)
  }

  return files
}

const htmlFiles = await listHtmlFiles(distDir)
const whatsappMarkup = `<a class="whatsapp" href="https://wa.me/5589999999999" target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp">
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M16.04 3C9.4 3 4 8.2 4 14.62c0 2.28.68 4.5 1.97 6.4L4 29l8.2-1.9a12.4 12.4 0 0 0 3.84.6C22.68 27.7 28 22.5 28 16.04S22.68 3 16.04 3Zm0 22.52c-1.2 0-2.38-.2-3.5-.6l-.84-.3-4.86 1.13 1.18-4.6-.55-.86a9.44 9.44 0 0 1-1.5-5.1c0-5.2 4.48-9.42 10.07-9.42 5.56 0 10.08 4.23 10.08 9.42s-4.52 9.43-10.08 9.43Zm5.53-7.06c-.3-.15-1.78-.85-2.06-.95-.28-.1-.48-.15-.68.15-.2.3-.78.95-.96 1.15-.18.2-.36.23-.66.08-.3-.15-1.27-.45-2.42-1.45a8.85 8.85 0 0 1-1.68-2.02c-.18-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.58-.93-2.16-.25-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1-1.06 2.45 0 1.45 1.1 2.85 1.25 3.05.15.2 2.16 3.17 5.24 4.45.73.3 1.3.48 1.75.62.74.22 1.4.19 1.93.11.59-.08 1.78-.7 2.03-1.38.25-.68.25-1.25.18-1.38-.08-.13-.28-.2-.58-.35Z"/>
  </svg>
  <span class="whatsapp-label">WhatsApp</span>
</a>`

for (const filePath of htmlFiles) {
  if (filePath.includes(`${path.sep}admin${path.sep}`)) continue

  let html = await fs.readFile(filePath, 'utf8')
  const isHome = path.resolve(filePath) === path.resolve(path.join(distDir, 'index.html'))
  const homeLink = `<a href="${basePath}"${isHome ? ' aria-current="page"' : ''}>Início</a>`

  if (!html.includes(`>${'Início'}<`)) {
    html = html.replace(
      /(<nav id="main-nav" class="nav" data-nav aria-label="Navegação principal">)/,
      `$1${homeLink}`,
    )
  }

  html = html.replace(
    /<a class="whatsapp"[\s\S]*?<\/a>/,
    whatsappMarkup,
  )

  await fs.writeFile(filePath, html, 'utf8')
}

const cssPath = path.join(distDir, 'assets', 'styles.css')
const refinements = `

/* Refinamentos de navegação e contato */
.nav{gap:18px}
.nav a{white-space:nowrap}
.whatsapp{
  position:fixed;
  right:24px;
  bottom:24px;
  z-index:70;
  width:auto;
  min-width:152px;
  height:58px;
  padding:0 20px;
  border:3px solid #fff;
  border-radius:999px;
  background:#1f9d68;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  text-decoration:none;
  font-weight:800;
  letter-spacing:.01em;
  box-shadow:0 14px 34px rgba(5,50,33,.28);
  transition:transform .2s ease,background-color .2s ease,box-shadow .2s ease;
}
.whatsapp:hover,.whatsapp:focus-visible{
  background:#178455;
  transform:translateY(-3px);
  box-shadow:0 18px 40px rgba(5,50,33,.34);
}
.whatsapp:focus-visible{outline:3px solid #f4ede2;outline-offset:3px}
.whatsapp svg{width:27px;height:27px;flex:0 0 auto}
.whatsapp-label{line-height:1}
@media(max-width:1080px) and (min-width:901px){
  .nav{gap:13px}
  .nav a{font-size:13px}
  .nav-cta{padding:9px 13px}
}
@media(max-width:620px){
  .whatsapp{
    right:16px;
    bottom:16px;
    width:58px;
    min-width:58px;
    height:58px;
    padding:0;
  }
  .whatsapp svg{width:29px;height:29px}
  .whatsapp-label{
    position:absolute;
    width:1px;
    height:1px;
    padding:0;
    margin:-1px;
    overflow:hidden;
    clip:rect(0,0,0,0);
    white-space:nowrap;
    border:0;
  }
}
`

let css = await fs.readFile(cssPath, 'utf8')
if (!css.includes('/* Refinamentos de navegação e contato */')) {
  css += refinements
  await fs.writeFile(cssPath, css, 'utf8')
}

console.log(`Interface refinada em ${htmlFiles.length - 1} páginas públicas.`)
