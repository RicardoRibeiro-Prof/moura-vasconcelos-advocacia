import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const basePath = '/moura-vasconcelos-advocacia/'
const assetVersion = '20260712-layout3'

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

function pageClass(filePath) {
  const relative = path.relative(distDir, filePath).replaceAll('\\', '/')
  if (relative === 'index.html') return 'page-home'
  if (relative === 'sobre/index.html') return 'page-inner page-about'
  if (relative === 'areas-de-atuacao/index.html') return 'page-inner page-area-list'
  if (relative.startsWith('areas-de-atuacao/')) return 'page-inner page-area-detail'
  if (relative === 'equipe/index.html') return 'page-inner page-team'
  if (relative === 'artigos/index.html') return 'page-inner page-articles'
  if (relative.startsWith('artigos/')) return 'page-inner page-article'
  if (relative === 'contato/index.html') return 'page-inner page-contact'
  if (relative === 'politica-de-privacidade/index.html') return 'page-inner page-privacy'
  if (relative === '404.html') return 'page-inner page-not-found'
  return 'page-inner'
}

const whatsappMarkup = `<a class="whatsapp" href="https://wa.me/5589999999999" target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.009-.372-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.004 21.5h-.003a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.647-.235-.374A9.86 9.86 0 0 1 2.112 11.6c.002-5.448 4.436-9.88 9.9-9.88 2.643.001 5.127 1.03 6.993 2.898a9.825 9.825 0 0 1 2.895 7.001c-.003 5.448-4.438 9.881-9.896 9.881m8.43-18.318A11.81 11.81 0 0 0 12.01 0C5.495 0 .191 5.287.189 11.603c0 2.045.535 4.04 1.552 5.797L.091 23.428l6.172-1.62a11.94 11.94 0 0 0 5.735 1.461h.005c6.512 0 11.818-5.288 11.821-11.603a11.72 11.72 0 0 0-3.39-8.484"/>
  </svg>
</a>`

const htmlFiles = await listHtmlFiles(distDir)

for (const filePath of htmlFiles) {
  if (filePath.includes(`${path.sep}admin${path.sep}`)) continue

  let html = await fs.readFile(filePath, 'utf8')
  const isHome = path.resolve(filePath) === path.resolve(path.join(distDir, 'index.html'))
  const homeLink = `<a href="${basePath}"${isHome ? ' aria-current="page"' : ''}>Início</a>`

  html = html.replace(
    /(<nav id="main-nav" class="nav" data-nav aria-label="Navegação principal">)([\s\S]*?)(<\/nav>)/,
    (match, open, content, close) => {
      const contentWithoutDuplicate = content.replace(/<a href="\/moura-vasconcelos-advocacia\/"[^>]*>Início<\/a>/g, '')
      return `${open}${homeLink}${contentWithoutDuplicate}${close}`
    },
  )

  html = html.replace(
    /<a\s+class="whatsapp"[\s\S]*?<\/a>/,
    whatsappMarkup,
  )

  const bodyClasses = pageClass(filePath)
  html = html.replace(
    /<body(?:\s+class="[^"]*")?\s+data-prerendered="true">/,
    `<body class="${bodyClasses}" data-prerendered="true">`,
  )

  html = html
    .replace(/assets\/styles\.css(?:\?v=[^"']*)?/g, `assets/styles.css?v=${assetVersion}`)
    .replace(/assets\/app\.js(?:\?v=[^"']*)?/g, `assets/app.js?v=${assetVersion}`)

  await fs.writeFile(filePath, html, 'utf8')
}

const cssPath = path.join(distDir, 'assets', 'styles.css')
const redesign = `

/* Layout próprio Moura & Vasconcelos — não replica o projeto Almeida & Castro */
body{background:#f7f2ea}
.demo{background:#b86b4b;color:#fff;padding:7px 20px;letter-spacing:.02em}
.header{position:sticky;top:0;background:#0c3029;color:#fff;border:0;box-shadow:0 12px 34px rgba(5,33,28,.18)}
.header-in{min-height:104px;display:grid;grid-template-columns:minmax(300px,1fr) auto;gap:34px}
.header-in>a:first-child{align-self:stretch;display:flex;align-items:center;text-decoration:none;border-right:1px solid rgba(255,255,255,.16);padding-right:34px}
.brand{gap:16px}.mark{width:60px;height:60px;border-radius:8px 28px 8px 28px;background:#b86b4b;color:#fff;letter-spacing:-1px}
.brand-copy strong{color:#fff;font-size:23px}.brand-copy small{color:#e9b8a1}
.nav{display:flex;gap:5px;align-items:center;background:rgba(255,255,255,.07);padding:8px;border-radius:16px}
.nav a{color:#fff;padding:10px 12px;border-radius:10px;font-size:13px;white-space:nowrap;transition:background-color .2s ease,color .2s ease}
.nav a:hover,.nav a:focus-visible{background:rgba(255,255,255,.12)}
.nav a[aria-current=page]{background:#fff;color:#0c3029}
.nav .nav-cta{background:#b86b4b;color:#fff;border:0;padding:11px 16px}
.menu{color:#fff}

.page-home .hero{position:relative;background:linear-gradient(90deg,#f4eadc 0 58%,#0c3029 58% 100%);padding:74px 0 92px}
.page-home .hero-grid{grid-template-columns:minmax(0,.92fr) minmax(390px,1.08fr);min-height:650px;gap:72px}
.page-home .hero .display{font-size:clamp(54px,7vw,94px);max-width:740px}
.page-home .hero .lead{max-width:610px;color:#5b655f}
.page-home .hero-photo{border-radius:210px 210px 24px 24px;aspect-ratio:4/5;border:10px solid rgba(255,255,255,.12);box-shadow:none}
.page-home .hero-note{left:-52px;bottom:42px;width:300px;border-radius:0 28px 0 28px;background:#b86b4b}
.page-home .trust{margin-top:-48px}
.page-home .trust-grid{border-radius:0;box-shadow:0 22px 50px rgba(10,44,37,.14)}
.page-home .trust-item{padding:30px 28px}

.page-inner .page-hero{position:relative;overflow:hidden;background:#f2e8da;color:#183b34;padding:0;border-bottom:1px solid #d8c9b7}
.page-inner .page-hero:before{content:'M&V';position:absolute;left:4vw;top:50%;transform:translateY(-50%);font:700 clamp(60px,8vw,120px)/1 Georgia,serif;color:rgba(184,107,75,.14);letter-spacing:-.08em}
.page-inner .page-hero .container{min-height:390px;padding:82px 0 72px 230px;position:relative}
.page-inner .breadcrumbs{color:#7b4d3b;margin-bottom:16px}.page-inner .breadcrumbs a{color:#7b4d3b}
.page-inner .page-title{color:#123f36;font-size:clamp(48px,6vw,78px);max-width:850px;letter-spacing:-.04em}
.page-inner .page-intro{color:#5f6b66;max-width:780px}

.section{padding:96px 0}
.heading{grid-template-columns:.72fr 1.28fr;border-top:1px solid #cfc3b4;padding-top:24px;align-items:start}
.heading .eyebrow{padding-top:9px}.heading h2{font-size:clamp(42px,5vw,66px)}
.soft{background:#ebe1d3}
.dark{background:#123f36}

.areas{display:grid;grid-template-columns:repeat(2,1fr);gap:0;border-top:1px solid #cfc3b4}
.area{min-height:210px;border:0;border-bottom:1px solid #cfc3b4;border-radius:0;background:transparent;padding:38px 34px 38px 92px;box-shadow:none}
.area:nth-child(odd){border-right:1px solid #cfc3b4}
.area:hover{transform:none;background:#fffaf3;box-shadow:inset 6px 0 0 #b86b4b}
.area b{position:absolute;left:28px;top:38px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #b86b4b;border-radius:50%}
.area h3{font-size:30px;margin:4px 0 12px}.area .arrow{right:28px;bottom:24px;color:#b86b4b}

.split{grid-template-columns:1.12fr .88fr;gap:76px}
.frame{border-radius:0;clip-path:polygon(0 0,88% 0,100% 12%,100% 100%,12% 100%,0 88%);box-shadow:none}
.copy{padding:24px 0}.copy h2{font-size:clamp(42px,5vw,62px)}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:6px 22px}

.steps{gap:0;border-top:1px solid rgba(255,255,255,.22)}
.step{border:0;border-right:1px solid rgba(255,255,255,.22);border-radius:0;padding:34px 28px;min-height:230px}
.step:last-child{border-right:0}.step h3{font-size:30px}

.articles{display:grid;grid-template-columns:1fr;gap:0;border-top:1px solid #cfc3b4}
.article{display:grid;grid-template-columns:310px 1fr;gap:34px;align-items:center;border:0;border-bottom:1px solid #cfc3b4;border-radius:0;background:transparent;padding:28px 0}
.article img{width:310px;height:205px;border-radius:12px 46px 12px 12px}.article-body{padding:0}.article h3{font-size:32px;margin:10px 0}

.page-team .team{display:grid;grid-template-columns:1fr;gap:38px}
.page-team .person{display:grid;grid-template-columns:42% 58%;border:0;border-radius:0;background:#ebe1d3;overflow:hidden}
.page-team .person:nth-child(even){grid-template-columns:58% 42%}
.page-team .person:nth-child(even) img{grid-column:2}.page-team .person:nth-child(even) .person-body{grid-column:1;grid-row:1}
.page-team .person img{width:100%;height:560px}.page-team .person-body{padding:60px;display:flex;flex-direction:column;justify-content:center}
.page-team .person h2{font-size:48px}

.page-contact .contact-grid{grid-template-columns:.9fr 1.1fr;gap:0;box-shadow:0 24px 60px rgba(15,55,46,.12)}
.page-contact .contact-card{background:#123f36;color:#fff;border:0;border-radius:0;padding:54px}.page-contact .contact-card .eyebrow{color:#eab59e}.page-contact .contact-card a{color:#fff}
.page-contact .contact-panel{background:#fffaf3;border:0;border-radius:0;padding:54px}

.cta{border-radius:0 70px 0 0;background:#123f36;padding:48px 54px}.cta h2{font-size:44px}
.footer{background:#071e19;border-top:9px solid #b86b4b;padding-top:72px}.footer .mark{border-radius:8px 28px 8px 28px;background:#b86b4b;color:#fff}.footer-bottom{color:#bcc9c5}

.whatsapp{position:fixed!important;right:18px!important;bottom:18px!important;z-index:90!important;width:50px!important;min-width:50px!important;height:50px!important;padding:0!important;border:0!important;border-radius:50%!important;background:#25d366!important;color:#fff!important;display:grid!important;place-items:center!important;overflow:hidden!important;text-decoration:none!important;line-height:0!important;font-size:0!important;box-shadow:0 9px 24px rgba(0,0,0,.25)!important;transition:transform .2s ease,background-color .2s ease!important}
.whatsapp:hover,.whatsapp:focus-visible{background:#1ebe5d!important;transform:translateY(-2px) scale(1.04)!important}.whatsapp svg{display:block!important;width:26px!important;height:26px!important;flex:none!important}.whatsapp-label{display:none!important}

@media(max-width:1080px){
  .header-in{grid-template-columns:280px auto;gap:18px}.header-in>a:first-child{padding-right:20px}.nav a{padding:9px 9px;font-size:12px}
  .page-home .hero-grid{grid-template-columns:1fr 1fr;gap:40px}.page-inner .page-hero .container{padding-left:180px}
}
@media(max-width:900px){
  .header-in{display:flex;min-height:86px}.header-in>a:first-child{border-right:0;padding-right:0}.menu{display:block;margin-left:auto}
  .nav{display:none;position:absolute;top:86px;left:0;right:0;background:#0c3029;border-radius:0;padding:18px 22px;box-shadow:0 18px 30px rgba(0,0,0,.18)}.nav.open{display:flex}.nav a{font-size:14px;padding:12px 14px}
  .page-home .hero{background:#f4eadc}.page-home .hero-grid{grid-template-columns:1fr}.page-home .hero-photo{max-height:620px}.page-home .hero-note{left:18px}
  .page-inner .page-hero:before{left:auto;right:4vw;top:24%;font-size:82px}.page-inner .page-hero .container{padding:70px 0 64px}
  .areas{grid-template-columns:1fr}.area:nth-child(odd){border-right:0}
  .split{grid-template-columns:1fr}.checks{grid-template-columns:1fr}.steps{grid-template-columns:repeat(2,1fr)}.step:nth-child(2){border-right:0}
  .page-team .person,.page-team .person:nth-child(even){grid-template-columns:1fr 1fr}.page-team .person:nth-child(even) img{grid-column:2}.page-team .person-body{padding:38px}
}
@media(max-width:620px){
  .demo{font-size:11px;padding:6px 10px}.header-in{min-height:78px}.nav{top:78px}.brand-copy strong{font-size:17px}.brand-copy small{font-size:9px}.mark{width:48px;height:48px}
  .page-home .hero{padding:52px 0 74px}.page-home .hero-grid{min-height:auto}.page-home .hero .display{font-size:50px}.page-home .hero-photo{border-radius:130px 130px 18px 18px}.page-home .hero-note{position:relative;left:auto;bottom:auto;margin:-36px 14px 0;width:auto}
  .page-inner .page-hero .container{min-height:330px;padding:58px 0 48px}.page-inner .page-title{font-size:46px}.page-inner .page-hero:before{font-size:64px;top:20%}
  .section{padding:68px 0}.heading{display:block}.heading .eyebrow{display:block;margin-bottom:12px}.heading h2{font-size:40px}
  .area{padding:30px 22px 30px 76px}.area b{left:18px;top:30px}.area h3{font-size:27px}
  .articles{display:block}.article{grid-template-columns:1fr;gap:18px}.article img{width:100%;height:220px;border-radius:10px 40px 10px 10px}.article h3{font-size:28px}
  .steps{grid-template-columns:1fr}.step{border-right:0;border-bottom:1px solid rgba(255,255,255,.2);min-height:auto}.step:last-child{border-bottom:0}
  .page-team .person,.page-team .person:nth-child(even){grid-template-columns:1fr}.page-team .person:nth-child(even) img,.page-team .person:nth-child(even) .person-body{grid-column:auto;grid-row:auto}.page-team .person img{height:420px}.page-team .person-body{padding:30px}.page-team .person h2{font-size:38px}
  .page-contact .contact-grid{grid-template-columns:1fr}.page-contact .contact-card,.page-contact .contact-panel{padding:34px 26px}
  .cta{padding:36px 28px;border-radius:0 42px 0 0}.cta h2{font-size:34px}
  .whatsapp{right:12px!important;bottom:12px!important;width:46px!important;min-width:46px!important;height:46px!important}.whatsapp svg{width:24px!important;height:24px!important}.footer{padding-bottom:88px}
}
`

let css = await fs.readFile(cssPath, 'utf8')
css += redesign
await fs.writeFile(cssPath, css, 'utf8')

console.log(`Novo layout aplicado em ${htmlFiles.length - 1} páginas públicas.`)
