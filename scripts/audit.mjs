import fs from 'node:fs/promises'
import path from 'node:path'

const dist = path.join(process.cwd(), 'dist')
const failures = []
const routes = [
  '',
  'sobre/',
  'areas-de-atuacao/',
  'areas-de-atuacao/direito-civil/',
  'areas-de-atuacao/direito-previdenciario/',
  'areas-de-atuacao/direito-trabalhista/',
  'areas-de-atuacao/direito-de-familia/',
  'areas-de-atuacao/direito-do-consumidor/',
  'areas-de-atuacao/direito-empresarial/',
  'equipe/',
  'artigos/',
  'artigos/planejamento-previdenciario-e-organizacao-documental/',
  'artigos/contratos-cuidados-antes-da-assinatura/',
  'artigos/compras-online-e-direitos-do-consumidor/',
  'contato/',
  'politica-de-privacidade/',
]

const exists = async (file) => fs.access(file).then(() => true).catch(() => false)
const read = (file) => fs.readFile(file, 'utf8')
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

for (const route of routes) {
  const file = path.join(dist, route, 'index.html')
  if (!(await exists(file))) {
    failures.push(`Página ausente: ${route || '/'}`)
    continue
  }
  const html = await read(file)
  const h1 = (html.match(/<h1\b/gi) || []).length
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || ''
  if (!/data-prerendered="true"/i.test(html)) failures.push(`${route || '/'}: marcador pré-renderizado ausente`)
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${route || '/'}: title ausente`)
  if (!/<meta name="description" content="[^"]+"/i.test(html)) failures.push(`${route || '/'}: description ausente`)
  if (!/<meta name="robots" content="noindex, nofollow"/i.test(html)) failures.push(`${route || '/'}: noindex ausente`)
  if (h1 !== 1) failures.push(`${route || '/'}: esperado um H1; encontrado ${h1}`)
  if (!canonical.startsWith('https://ricardoribeiro-prof.github.io/moura-vasconcelos-advocacia/')) failures.push(`${route || '/'}: canonical incorreto`)
  if (canonical.includes('moura-vasconcelos-advocacia/moura-vasconcelos-advocacia')) failures.push(`${route || '/'}: caminho-base duplicado`)
  if (!html.includes('/moura-vasconcelos-advocacia/assets/styles.css')) failures.push(`${route || '/'}: CSS fora do caminho-base`)
  if (!html.includes('/moura-vasconcelos-advocacia/assets/app.js')) failures.push(`${route || '/'}: JavaScript fora do caminho-base`)
  if (strip(html).length < 220) failures.push(`${route || '/'}: conteúdo textual insuficiente`)
}

for (const asset of ['assets/styles.css','assets/app.js','assets/favicon.svg','assets/social-share.svg','manifest.webmanifest','robots.txt','sitemap.xml','404.html','admin/index.html']) {
  if (!(await exists(path.join(dist, asset)))) failures.push(`Arquivo essencial ausente: ${asset}`)
}

const robots = await read(path.join(dist, 'robots.txt'))
if (robots.trim() !== 'User-agent: *\nAllow: /') failures.push('robots.txt incorreto')
const sitemap = await read(path.join(dist, 'sitemap.xml'))
if (!/<urlset[^>]*><\/urlset>/i.test(sitemap.replace(/\s+/g, ''))) failures.push('sitemap demonstrativo deve ser XML válido e vazio')

if (failures.length) {
  console.error(`Auditoria falhou (${failures.length} problema(s)):\n${failures.map((item) => `- ${item}`).join('\n')}`)
  process.exit(1)
}

console.log(`Auditoria concluída: ${routes.length} páginas públicas, painel, página 404, assets, canonicals, robots e sitemap validados.`)
