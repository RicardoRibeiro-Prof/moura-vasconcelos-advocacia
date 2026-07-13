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
const whatsappMarkup = `<a class="whatsapp" href="https://wa.me/5589999999999" target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.009-.372-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.004 21.5h-.003a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.647-.235-.374A9.86 9.86 0 0 1 2.112 11.6c.002-5.448 4.436-9.88 9.9-9.88 2.643.001 5.127 1.03 6.993 2.898a9.825 9.825 0 0 1 2.895 7.001c-.003 5.448-4.438 9.881-9.896 9.881m8.43-18.318A11.81 11.81 0 0 0 12.01 0C5.495 0 .191 5.287.189 11.603c0 2.045.535 4.04 1.552 5.797L.091 23.428l6.172-1.62a11.94 11.94 0 0 0 5.735 1.461h.005c6.512 0 11.818-5.288 11.821-11.603a11.72 11.72 0 0 0-3.39-8.484"/>
  </svg>
</a>`

for (const filePath of htmlFiles) {
  if (filePath.includes(`${path.sep}admin${path.sep}`)) continue

  let html = await fs.readFile(filePath, 'utf8')
  const isHome = path.resolve(filePath) === path.resolve(path.join(distDir, 'index.html'))
  const homeLink = `<a href="${basePath}"${isHome ? ' aria-current="page"' : ''}>Início</a>`

  if (!html.includes('>Início<')) {
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
  right:20px;
  bottom:20px;
  z-index:70;
  width:54px;
  min-width:54px;
  height:54px;
  padding:0;
  border:0;
  border-radius:50%;
  background:#25d366;
  color:#fff;
  display:grid;
  place-items:center;
  overflow:hidden;
  text-decoration:none;
  line-height:0;
  box-shadow:0 10px 26px rgba(0,0,0,.24);
  transition:transform .2s ease,background-color .2s ease,box-shadow .2s ease;
}
.whatsapp:hover,.whatsapp:focus-visible{
  background:#1ebe5d;
  transform:translateY(-2px) scale(1.03);
  box-shadow:0 14px 30px rgba(0,0,0,.28);
}
.whatsapp:focus-visible{outline:3px solid #fff;outline-offset:3px}
.whatsapp svg{width:28px;height:28px;display:block;flex:none}
@media(max-width:1080px) and (min-width:901px){
  .nav{gap:13px}
  .nav a{font-size:13px}
  .nav-cta{padding:9px 13px}
}
@media(max-width:620px){
  .whatsapp{
    right:14px;
    bottom:14px;
    width:50px;
    min-width:50px;
    height:50px;
  }
  .whatsapp svg{width:26px;height:26px}
  .footer{padding-bottom:100px}
}
`

let css = await fs.readFile(cssPath, 'utf8')
if (!css.includes('/* Refinamentos de navegação e contato */')) {
  css += refinements
  await fs.writeFile(cssPath, css, 'utf8')
}

console.log(`Interface refinada em ${htmlFiles.length - 1} páginas públicas.`)
