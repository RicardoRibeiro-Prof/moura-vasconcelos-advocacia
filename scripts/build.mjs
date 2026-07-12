import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const basePath = '/moura-vasconcelos-advocacia/'
const siteUrl = 'https://ricardoribeiro-prof.github.io/moura-vasconcelos-advocacia'
const rawBase = 'https://raw.githubusercontent.com/RicardoRibeiro-Prof/almeida-castro-advocacia/main/public/images/'

const office = {
  name: 'Moura & Vasconcelos Advocacia',
  short: 'Moura & Vasconcelos',
  city: 'São Raimundo Nonato',
  state: 'PI',
  phone: '(89) 99999-9999',
  whatsapp: '5589999999999',
  email: 'contato@mouraevasconcelos.adv.br',
  address: 'Rua Coronel José Dias, 315, Centro, São Raimundo Nonato – PI',
  description: 'Projeto demonstrativo de advocacia com atendimento institucional, comunicação clara e atuação jurídica responsável em São Raimundo Nonato – PI.',
}

const areas = [
  ['direito-civil', 'Direito Civil', 'Contratos, responsabilidade civil, obrigações e relações patrimoniais.'],
  ['direito-previdenciario', 'Direito Previdenciário', 'Benefícios, planejamento contributivo e organização documental previdenciária.'],
  ['direito-trabalhista', 'Direito Trabalhista', 'Orientação sobre vínculos, jornada, verbas e relações de trabalho.'],
  ['direito-de-familia', 'Direito de Família', 'Divórcio, guarda, alimentos, inventário e relações familiares.'],
  ['direito-do-consumidor', 'Direito do Consumidor', 'Compras, contratos, cobranças e falhas na prestação de serviços.'],
  ['direito-empresarial', 'Direito Empresarial', 'Contratos, sociedades, prevenção de riscos e organização jurídica de empresas.'],
]

const articles = [
  {
    slug: 'planejamento-previdenciario-e-organizacao-documental',
    title: 'Planejamento previdenciário e organização documental',
    category: 'Direito Previdenciário',
    date: '2026-07-08',
    reading: '5 min',
    image: `${rawBase}articles/previdenciario.jpg`,
    summary: 'Entenda por que conferir vínculos, contribuições e documentos antes do requerimento pode reduzir dúvidas e retrabalho.',
    body: [
      ['O que é o planejamento previdenciário?', 'É uma análise do histórico contributivo e dos documentos que podem influenciar a concessão de benefícios. O objetivo é organizar informações e comparar cenários possíveis.'],
      ['Quais dados costumam ser conferidos?', 'Vínculos registrados, remunerações, períodos especiais ou rurais, contribuições em atraso e documentos que possam complementar o cadastro previdenciário.'],
      ['Por que revisar antes do pedido?', 'Inconsistências podem exigir correções ou documentos adicionais. A revisão prévia ajuda a identificar pendências antes do protocolo.'],
    ],
  },
  {
    slug: 'contratos-cuidados-antes-da-assinatura',
    title: 'Contratos: cuidados antes da assinatura',
    category: 'Direito Civil',
    date: '2026-07-03',
    reading: '4 min',
    image: `${rawBase}articles/civil.jpg`,
    summary: 'Conheça pontos importantes sobre objeto, responsabilidades, prazos, multas e encerramento de contratos.',
    body: [
      ['Identificação e objeto', 'As partes precisam estar corretamente identificadas e o objeto deve explicar com clareza o que será entregue, executado ou disponibilizado.'],
      ['Valores e prazos', 'O contrato deve indicar valores, datas de pagamento, correção, multas, prazos de entrega e consequências do atraso.'],
      ['Encerramento', 'Também é importante compreender renovação, rescisão, avisos prévios e responsabilidades após o término do contrato.'],
    ],
  },
  {
    slug: 'compras-online-e-direitos-do-consumidor',
    title: 'Compras online e direitos do consumidor',
    category: 'Direito do Consumidor',
    date: '2026-06-25',
    reading: '5 min',
    image: `${rawBase}articles/consumidor.jpg`,
    summary: 'Informação, prazo de entrega, arrependimento e registros importantes para resolver problemas em compras pela internet.',
    body: [
      ['Informação antes da compra', 'Preço total, frete, prazo de entrega, características do produto e canais de atendimento devem ser apresentados de forma clara.'],
      ['Guarde os registros', 'Comprovantes de pagamento, capturas da oferta, protocolos e mensagens ajudam a demonstrar o que foi contratado.'],
      ['Problemas com a entrega', 'O primeiro passo costuma ser registrar a ocorrência com o fornecedor e solicitar solução por um canal que gere protocolo.'],
    ],
  },
]

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const link = (route = '') => `${basePath}${String(route).replace(/^\/+/, '')}`
const canonical = (route = '') => new URL(String(route).replace(/^\/+/, ''), `${siteUrl}/`).href

const navItems = [
  ['sobre/', 'O escritório', 'sobre'],
  ['areas-de-atuacao/', 'Áreas de atuação', 'areas'],
  ['equipe/', 'Equipe', 'equipe'],
  ['artigos/', 'Artigos', 'artigos'],
  ['contato/', 'Contato', 'contato'],
]

const styles = `:root{--green:#123f36;--green-2:#0b2c26;--copper:#b86b4b;--sand:#f4ede2;--paper:#fffdf9;--ink:#1c2724;--muted:#68726e;--line:#d9d0c4;--radius:26px;--shadow:0 22px 60px rgba(14,42,36,.13)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:var(--paper);line-height:1.65}a{color:inherit}img{max-width:100%;display:block}.container{width:min(1180px,calc(100% - 40px));margin:auto}.demo{background:#0b2c26;color:#f9efe5;text-align:center;padding:8px 16px;font-size:13px}.skip{position:fixed;left:-999px;top:10px;z-index:999;background:#fff;padding:12px}.skip:focus{left:10px}.header{position:sticky;top:0;z-index:50;background:rgba(255,253,249,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(18,63,54,.12)}.header-in{width:min(1180px,calc(100% - 40px));margin:auto;display:flex;align-items:center;justify-content:space-between;min-height:92px}.brand{display:flex;align-items:center;gap:14px;text-decoration:none}.mark{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:var(--green);color:#fff;font-family:Georgia,serif;font-weight:700;letter-spacing:-2px}.brand-copy strong{display:block;font-family:Georgia,serif;font-size:22px}.brand-copy small{display:block;color:var(--copper);letter-spacing:.28em;text-transform:uppercase;font-weight:800}.nav{display:flex;align-items:center;gap:24px}.nav a{text-decoration:none;font-weight:700;font-size:14px}.nav a[aria-current=page]{color:var(--copper)}.nav-cta{border:1px solid var(--green);padding:10px 16px;border-radius:999px}.menu{display:none;border:0;background:none;font-size:28px}.hero{background:linear-gradient(135deg,var(--sand),#fff);padding:80px 0 64px;overflow:hidden}.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;align-items:center;gap:64px}.eyebrow{display:inline-block;color:var(--copper);text-transform:uppercase;letter-spacing:.18em;font-weight:800;font-size:13px}.display{font-family:Georgia,serif;font-size:clamp(46px,7vw,84px);line-height:.98;margin:18px 0 24px;letter-spacing:-.045em}.display em{color:var(--green);font-style:italic}.lead{font-size:20px;color:var(--muted);max-width:660px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:999px;text-decoration:none;font-weight:800}.btn-main{background:var(--green);color:#fff}.btn-line{border:1px solid var(--green);color:var(--green)}.btn-light{background:#fff;color:var(--green)}.hero-visual{position:relative}.hero-photo{border-radius:110px 24px 110px 24px;overflow:hidden;box-shadow:var(--shadow);aspect-ratio:4/5}.hero-photo img{width:100%;height:100%;object-fit:cover}.hero-note{position:absolute;left:-35px;bottom:30px;background:var(--copper);color:#fff;padding:22px;border-radius:22px;width:min(270px,75%);box-shadow:var(--shadow)}.trust{margin-top:-24px;position:relative;z-index:2}.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border-radius:22px;box-shadow:var(--shadow);overflow:hidden}.trust-item{padding:26px;display:flex;gap:14px;border-right:1px solid var(--line)}.trust-item:last-child{border:0}.trust-icon{color:var(--copper);font-weight:900}.trust-item strong,.trust-item span{display:block}.trust-item span{color:var(--muted);font-size:14px}.section{padding:88px 0}.soft{background:var(--sand)}.dark{background:var(--green-2);color:#fff}.heading{display:grid;grid-template-columns:1fr .72fr;gap:48px;align-items:end;margin-bottom:38px}.heading h2,.copy h2,.page-title{font-family:Georgia,serif;font-size:clamp(34px,5vw,58px);line-height:1.08;margin:10px 0}.heading p,.copy p{color:var(--muted)}.dark .heading p{color:#c9d5d1}.areas{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.area{position:relative;padding:28px;border:1px solid var(--line);border-radius:24px;text-decoration:none;background:#fff;min-height:235px;transition:.25s}.area:hover{transform:translateY(-5px);box-shadow:var(--shadow);border-color:var(--copper)}.area b{color:var(--copper)}.area h3{font-family:Georgia,serif;font-size:27px;margin:20px 0 10px}.area p{color:var(--muted)}.arrow{position:absolute;right:25px;bottom:20px;font-size:24px}.split{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center}.frame{border-radius:24px 90px 24px 90px;overflow:hidden;box-shadow:var(--shadow)}.frame img{width:100%;height:620px;object-fit:cover}.checks{padding:0;list-style:none}.checks li{margin:12px 0;padding-left:28px;position:relative}.checks li:before{content:'✓';position:absolute;left:0;color:var(--copper);font-weight:900}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.step{border:1px solid rgba(255,255,255,.18);border-radius:22px;padding:24px}.step h3{font-family:Georgia,serif;font-size:26px}.articles{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.article{background:#fff;border:1px solid var(--line);border-radius:24px;overflow:hidden}.article img{width:100%;height:240px;object-fit:cover}.article-body{padding:24px}.article h3{font-family:Georgia,serif;font-size:26px;line-height:1.2}.meta{color:var(--copper);font-size:13px;text-transform:uppercase;letter-spacing:.12em;font-weight:800}.page-hero{background:var(--green);color:#fff;padding:64px 0}.page-hero .page-intro{max-width:760px;color:#dbe4e1;font-size:19px}.breadcrumbs{display:flex;gap:8px;flex-wrap:wrap;font-size:14px}.breadcrumbs a{color:#fff}.team{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}.person{background:#fff;border:1px solid var(--line);border-radius:28px;overflow:hidden}.person img{width:100%;height:470px;object-fit:cover}.person-body{padding:28px}.person h2{font-family:Georgia,serif;font-size:34px;margin:6px 0}.tags{display:flex;flex-wrap:wrap;gap:8px}.tag{background:var(--sand);padding:6px 11px;border-radius:999px;font-size:13px}.prose{max-width:820px}.prose h2{font-family:Georgia,serif;font-size:34px;margin-top:38px}.notice{padding:20px;border-left:4px solid var(--copper);background:var(--sand);margin:30px 0}.contact-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:30px}.contact-card,.contact-panel{padding:30px;border-radius:26px;border:1px solid var(--line);background:#fff}.contact-list{list-style:none;padding:0}.contact-list li{margin:14px 0}.cta{background:var(--copper);color:#fff;padding:40px;border-radius:30px;display:flex;justify-content:space-between;align-items:center;gap:30px}.cta h2{font-family:Georgia,serif;font-size:38px;margin:0}.footer{background:#081d19;color:#fff;padding:64px 0 28px}.footer-grid{display:grid;grid-template-columns:1.4fr .8fr .8fr;gap:40px}.footer .mark{background:#fff;color:var(--green)}.footer a{text-decoration:none}.footer-links{display:grid;gap:10px}.footer-title{font-size:14px;text-transform:uppercase;letter-spacing:.16em;color:#d2a48d}.footer-bottom{border-top:1px solid rgba(255,255,255,.15);margin-top:42px;padding-top:22px;display:flex;justify-content:space-between;gap:20px;font-size:13px}.whatsapp{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:#1e9d63;color:#fff;display:grid;place-items:center;text-decoration:none;font-weight:900;box-shadow:var(--shadow)}.noscript{padding:12px;background:#fff2cf;text-align:center}.admin{min-height:100vh;background:var(--sand);padding:50px 20px}.admin-card{max-width:620px;margin:auto;background:#fff;border-radius:28px;padding:34px;box-shadow:var(--shadow)}@media(max-width:900px){.nav{display:none;position:absolute;top:92px;left:0;right:0;background:#fff;padding:24px;flex-direction:column;align-items:stretch;border-bottom:1px solid var(--line)}.nav.open{display:flex}.menu{display:block}.hero-grid,.split,.heading,.contact-grid{grid-template-columns:1fr}.areas,.articles{grid-template-columns:repeat(2,1fr)}.steps{grid-template-columns:repeat(2,1fr)}.hero-note{left:15px}.footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.container,.header-in{width:min(100% - 28px,1180px)}.header-in{min-height:78px}.brand-copy strong{font-size:18px}.brand-copy small{font-size:10px}.mark{width:48px;height:48px}.nav{top:78px}.hero{padding-top:54px}.display{font-size:50px}.trust{margin-top:16px}.trust-grid,.areas,.articles,.team,.steps,.footer-grid{grid-template-columns:1fr}.trust-item{border-right:0;border-bottom:1px solid var(--line)}.heading{gap:10px}.section{padding:64px 0}.frame img{height:420px}.person img{height:390px}.cta{align-items:flex-start;flex-direction:column}.footer-bottom{flex-direction:column}.hero-note{position:relative;left:auto;bottom:auto;margin:-40px 14px 0}.page-title{font-size:42px}}`

const appJs = `document.querySelector('[data-menu]')?.addEventListener('click',e=>{const n=document.querySelector('[data-nav]');const open=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));e.currentTarget.textContent=open?'×':'☰'});document.querySelectorAll('[data-nav] a').forEach(a=>a.addEventListener('click',()=>document.querySelector('[data-nav]')?.classList.remove('open')));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());`

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#123f36"/><text x="32" y="39" text-anchor="middle" fill="#fff" font-size="23" font-family="Georgia" font-weight="700">M&amp;V</text></svg>`
const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#123f36"/><circle cx="195" cy="315" r="105" fill="#f4ede2"/><text x="195" y="340" text-anchor="middle" fill="#123f36" font-size="62" font-family="Georgia" font-weight="700">M&amp;V</text><text x="350" y="300" fill="#fff" font-size="70" font-family="Georgia" font-weight="700">Moura &amp; Vasconcelos</text><text x="355" y="365" fill="#d7a289" font-size="28" font-family="Arial" letter-spacing="10">ADVOCACIA</text></svg>`

function brand() {
  return `<span class="brand"><span class="mark" aria-hidden="true">M&amp;V</span><span class="brand-copy"><strong>Moura &amp; Vasconcelos</strong><small>Advocacia</small></span></span>`
}

function head({ title, description, route = '', type = 'website', image = `${siteUrl}/assets/social-share.svg`, article }) {
  const url = canonical(route)
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="noindex, nofollow"><meta name="googlebot" content="noindex, nofollow"><meta name="theme-color" content="#123f36"><link rel="canonical" href="${url}"><link rel="icon" href="${link('assets/favicon.svg')}" type="image/svg+xml"><link rel="manifest" href="${link('manifest.webmanifest')}"><link rel="stylesheet" href="${link('assets/styles.css')}"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="${esc(office.name)}"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:image:alt" content="Identidade visual de ${esc(office.name)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${image}">${article ? `<meta property="article:published_time" content="${article.date}T09:00:00-03:00"><meta property="article:modified_time" content="${article.date}T09:00:00-03:00"><meta property="article:author" content="${esc(office.name)}"><meta property="article:section" content="${esc(article.category)}">` : ''}</head>`
}

function header(active = '') {
  const nav = navItems.map(([href,label,key]) => `<a href="${link(href)}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')
  return `<a class="skip" href="#main-content">Pular para o conteúdo</a><div class="demo"><strong>Projeto demonstrativo:</strong> escritório, profissionais e contatos são fictícios.</div><header class="header"><div class="header-in"><a href="${link()}">${brand()}</a><button class="menu" type="button" data-menu aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menu">☰</button><nav id="main-nav" class="nav" data-nav aria-label="Navegação principal">${nav}<a class="nav-cta" href="${link('contato/')}">Solicitar contato</a></nav></div></header>`
}

function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div><a href="${link()}">${brand()}</a><p>Atendimento jurídico demonstrativo com método, proximidade e comunicação acessível.</p></div><div><h2 class="footer-title">Navegação</h2><div class="footer-links"><a href="${link('sobre/')}">O escritório</a><a href="${link('areas-de-atuacao/')}">Áreas de atuação</a><a href="${link('equipe/')}">Equipe</a><a href="${link('artigos/')}">Artigos</a></div></div><div><h2 class="footer-title">Informações</h2><div class="footer-links"><a href="${link('contato/')}">Contato</a><a href="${link('politica-de-privacidade/')}">Política de privacidade</a><span>${office.city} – ${office.state}</span></div></div></div><div class="footer-bottom"><span>© <span data-year>2026</span> ${esc(office.name)}.</span><span><strong>Projeto fictício para portfólio.</strong> Não representa escritório real.</span></div></div></footer><a class="whatsapp" href="https://wa.me/${office.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">WA</a><script src="${link('assets/app.js')}" defer></script>`
}

function layout({ title, description, route = '', active = '', body, type, article, image }) {
  return `${head({ title, description, route, type, article, image })}<body data-prerendered="true"><noscript><div class="noscript">O conteúdo permanece disponível sem JavaScript. Apenas o menu móvel depende dele.</div></noscript>${header(active)}<main id="main-content">${body}</main>${footer()}</body></html>`
}

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${link()}">Início</a><span>›</span>${items.map(([href,label],i) => i === items.length - 1 ? `<span aria-current="page">${label}</span>` : `<a href="${link(href)}">${label}</a><span>›</span>`).join('')}</nav>`
}

function pageHero(title, intro, items) {
  return `<section class="page-hero"><div class="container">${breadcrumbs(items)}<h1 class="page-title">${title}</h1><p class="page-intro">${intro}</p></div></section>`
}

function areaCards() {
  return `<div class="areas">${areas.map(([slug,title,description],i) => `<a class="area" href="${link(`areas-de-atuacao/${slug}/`)}"><b>0${i+1}</b><h3>${title}</h3><p>${description}</p><span class="arrow">→</span></a>`).join('')}</div>`
}

function articleCards() {
  return `<div class="articles">${articles.map(article => `<article class="article"><img src="${article.image}" width="720" height="450" loading="lazy" decoding="async" alt="Imagem ilustrativa sobre ${esc(article.category)}"><div class="article-body"><span class="meta">${article.category} · ${article.reading}</span><h3>${article.title}</h3><p>${article.summary}</p><a href="${link(`artigos/${article.slug}/`)}">Ler artigo →</a></div></article>`).join('')}</div>`
}

const cta = `<section class="section"><div class="container"><div class="cta"><div><h2>Organize suas dúvidas antes de decidir.</h2><p>O primeiro contato ajuda a compreender o tema e indicar os documentos iniciais.</p></div><a class="btn btn-light" href="${link('contato/')}">Conhecer os canais</a></div></div></section>`

const pages = new Map()

pages.set('', layout({
  title: 'Moura & Vasconcelos Advocacia em São Raimundo Nonato – PI',
  description: office.description,
  body: `<section class="hero"><div class="container hero-grid"><div><span class="eyebrow">Advocacia com proximidade e método</span><h1 class="display">Decisões jurídicas com <em>mais clareza.</em></h1><p class="lead">Atendimento demonstrativo para pessoas, famílias e empresas, com escuta cuidadosa, análise documental e comunicação objetiva.</p><div class="actions"><a class="btn btn-main" href="${link('contato/')}">Iniciar contato</a><a class="btn btn-line" href="${link('areas-de-atuacao/')}">Conhecer áreas</a></div></div><div class="hero-visual"><div class="hero-photo"><img src="${rawBase}hero-office.jpg" width="900" height="1125" fetchpriority="high" alt="Ambiente profissional de escritório jurídico"></div><div class="hero-note"><strong>Atendimento organizado</strong><p>Contexto, documentos e alternativas apresentados sem promessas de resultado.</p></div></div></div></section><div class="container trust"><div class="trust-grid"><div class="trust-item"><span class="trust-icon">01</span><div><strong>Escuta cuidadosa</strong><span>Compreensão dos fatos e objetivos.</span></div></div><div class="trust-item"><span class="trust-icon">02</span><div><strong>Análise documental</strong><span>Organização antes da orientação.</span></div></div><div class="trust-item"><span class="trust-icon">03</span><div><strong>Comunicação clara</strong><span>Riscos e caminhos explicados.</span></div></div></div></div><section class="section"><div class="container"><div class="heading"><div><span class="eyebrow">Áreas de atuação</span><h2>Orientação jurídica em diferentes momentos.</h2></div><p>Cada situação é analisada individualmente, considerando documentos, legislação e limites éticos da advocacia.</p></div>${areaCards()}</div></section><section class="section soft"><div class="container split"><div class="frame"><img src="${rawBase}about-office.jpg" width="800" height="940" loading="lazy" decoding="async" alt="Sala de reunião contemporânea"></div><div class="copy"><span class="eyebrow">Nossa proposta</span><h2>Seriedade jurídica com uma experiência mais humana.</h2><p>Moura & Vasconcelos apresenta uma identidade contemporânea, acolhedora e organizada, criada para demonstrar um escritório profissional de alto padrão.</p><ul class="checks"><li>Compreensão do contexto antes da orientação</li><li>Explicação clara dos riscos e alternativas</li><li>Sigilo e organização em todas as etapas</li></ul><a class="btn btn-line" href="${link('sobre/')}">Conhecer o escritório</a></div></div></section><section class="section dark"><div class="container"><div class="heading"><div><span class="eyebrow">Como funciona</span><h2>Um atendimento construído em quatro etapas.</h2></div><p>O fluxo ajuda a tornar a conversa mais objetiva e evita decisões baseadas em informações incompletas.</p></div><div class="steps"><div class="step"><h3>Escuta</h3><p>Entendimento dos fatos e necessidades.</p></div><div class="step"><h3>Documentos</h3><p>Conferência dos registros relacionados.</p></div><div class="step"><h3>Análise</h3><p>Identificação de riscos e alternativas.</p></div><div class="step"><h3>Orientação</h3><p>Explicação dos próximos passos.</p></div></div></div></section><section class="section"><div class="container"><div class="heading"><div><span class="eyebrow">Conteúdo informativo</span><h2>Artigos para compreender temas jurídicos.</h2></div><p>Informações gerais que não substituem uma análise individualizada.</p></div>${articleCards()}</div></section>${cta}`,
}))

pages.set('sobre/', layout({ title: 'O Escritório | Moura & Vasconcelos Advocacia', description: 'Conheça a proposta institucional e a forma de atendimento da Moura & Vasconcelos Advocacia.', route: 'sobre/', active: 'sobre', body: `${pageHero('Atuação jurídica com método, escuta e responsabilidade.', 'Uma proposta institucional contemporânea para atendimento jurídico claro e organizado.', [['sobre/','O escritório']])}<section class="section"><div class="container split"><div class="copy"><span class="eyebrow">Identidade</span><h2>Seriedade sem abrir mão de uma comunicação humana.</h2><p>Moura & Vasconcelos Advocacia é um escritório fictício criado para portfólio. Sua proposta visual e textual prioriza clareza, método e sobriedade.</p><p>O atendimento apresentado começa pela compreensão do contexto e pela conferência dos documentos antes da indicação de qualquer medida.</p><ul class="checks"><li>Ética e responsabilidade</li><li>Comunicação acessível</li><li>Organização documental</li><li>Respeito às particularidades</li></ul></div><div class="frame"><img src="${rawBase}about-office.jpg" width="800" height="940" alt="Ambiente institucional do escritório"></div></div></section>${cta}` }))

pages.set('areas-de-atuacao/', layout({ title: 'Áreas de Atuação | Moura & Vasconcelos Advocacia', description: 'Conheça as áreas de atuação jurídica demonstrativas da Moura & Vasconcelos Advocacia.', route: 'areas-de-atuacao/', active: 'areas', body: `${pageHero('Áreas de atuação', 'Atendimento consultivo, preventivo e contencioso definido após análise dos fatos e documentos.', [['areas-de-atuacao/','Áreas de atuação']])}<section class="section"><div class="container">${areaCards()}</div></section>${cta}` }))

for (const [slug,title,description] of areas) {
  pages.set(`areas-de-atuacao/${slug}/`, layout({ title: `${title} | Moura & Vasconcelos Advocacia`, description: `${description} Atendimento demonstrativo em São Raimundo Nonato – PI.`, route: `areas-de-atuacao/${slug}/`, active: 'areas', body: `${pageHero(title, description, [['areas-de-atuacao/','Áreas de atuação'],[`areas-de-atuacao/${slug}/`,title]])}<section class="section"><div class="container prose"><span class="eyebrow">Quando esta área pode ser necessária</span><h2>Orientação adequada começa pela compreensão do contexto.</h2><p>${description}</p><p>O atendimento considera documentos, prazos, histórico das relações envolvidas e objetivos apresentados. As alternativas são explicadas com linguagem clara, sem promessa de resultado.</p><h2>Forma de atuação</h2><p>A atuação pode envolver análise preventiva, organização documental, elaboração de instrumentos, negociação ou acompanhamento de procedimento judicial ou administrativo.</p><h2>Perguntas frequentes</h2><div class="notice"><strong>Preciso reunir documentos antes do contato?</strong><p>É útil separar contratos, comprovantes, mensagens, documentos pessoais e outros registros relacionados ao tema.</p></div><div class="notice"><strong>O primeiro contato já define a solução?</strong><p>Não. A orientação depende da compreensão dos fatos e da análise dos documentos relevantes.</p></div></div></section>${cta}` }))
}

pages.set('equipe/', layout({ title: 'Equipe | Moura & Vasconcelos Advocacia', description: 'Conheça a equipe fictícia e as áreas de atuação da Moura & Vasconcelos Advocacia.', route: 'equipe/', active: 'equipe', body: `${pageHero('Nossa equipe', 'Profissionais fictícios criados para demonstrar a apresentação institucional do escritório.', [['equipe/','Equipe']])}<section class="section"><div class="container team"><article class="person"><img src="${rawBase}team-marina.jpg" width="800" height="1000" alt="Fotografia ilustrativa de profissional feminina"><div class="person-body"><span class="meta">Advogada sócia</span><h2>Dra. Helena Moura</h2><p>Atuação demonstrativa em Direito Previdenciário, Trabalhista e de Família, com comunicação acolhedora e organização documental.</p><div class="tags"><span class="tag">Previdenciário</span><span class="tag">Trabalhista</span><span class="tag">Família</span></div></div></article><article class="person"><img src="${rawBase}team-rafael.jpg" width="800" height="1000" alt="Fotografia ilustrativa de profissional masculino"><div class="person-body"><span class="meta">Advogado sócio</span><h2>Dr. Lucas Vasconcelos</h2><p>Atuação demonstrativa em Direito Civil, Empresarial e do Consumidor, com atenção à prevenção de riscos e contratos.</p><div class="tags"><span class="tag">Civil</span><span class="tag">Empresarial</span><span class="tag">Consumidor</span></div></div></article></div><div class="container"><p class="notice">Nomes, registros, formações e fotografias são meramente ilustrativos.</p></div></section>${cta}` }))

pages.set('artigos/', layout({ title: 'Artigos Jurídicos | Moura & Vasconcelos Advocacia', description: 'Conteúdos jurídicos informativos sobre temas do cotidiano.', route: 'artigos/', active: 'artigos', body: `${pageHero('Artigos jurídicos', 'Conteúdos informativos em linguagem acessível. Não substituem análise individual.', [['artigos/','Artigos']])}<section class="section"><div class="container">${articleCards()}</div></section>` }))

for (const article of articles) {
  pages.set(`artigos/${article.slug}/`, layout({ title: `${article.title} | Moura & Vasconcelos`, description: article.summary, route: `artigos/${article.slug}/`, active: 'artigos', type: 'article', article, image: article.image, body: `${pageHero(article.title, article.summary, [['artigos/','Artigos'],[`artigos/${article.slug}/`,article.title]])}<article class="section"><div class="container prose"><p class="meta">${article.category} · <time datetime="${article.date}">${new Intl.DateTimeFormat('pt-BR').format(new Date(`${article.date}T12:00:00Z`))}</time> · ${article.reading}</p><img src="${article.image}" width="1200" height="630" alt="Imagem ilustrativa sobre ${esc(article.category)}" style="border-radius:24px;margin:28px 0">${article.body.map(([h,p]) => `<h2>${h}</h2><p>${p}</p>`).join('')}<div class="notice"><strong>Aviso informativo</strong><p>Este conteúdo é geral e não substitui uma análise jurídica individualizada.</p></div><p><a href="${link('artigos/')}">← Voltar aos artigos</a></p></div></article>` }))
}

pages.set('contato/', layout({ title: 'Contato | Moura & Vasconcelos Advocacia', description: 'Conheça os canais demonstrativos de contato da Moura & Vasconcelos Advocacia.', route: 'contato/', active: 'contato', body: `${pageHero('Contato', 'Envie uma breve descrição do tema para organizar o primeiro atendimento.', [['contato/','Contato']])}<section class="section"><div class="container contact-grid"><div class="contact-card"><span class="eyebrow">Canais demonstrativos</span><h2>Fale com o escritório</h2><ul class="contact-list"><li><strong>WhatsApp:</strong><br><a href="https://wa.me/${office.whatsapp}" target="_blank" rel="noopener noreferrer">${office.phone}</a></li><li><strong>E-mail:</strong><br><a href="mailto:${office.email}">${office.email}</a></li><li><strong>Endereço:</strong><br>${office.address}</li></ul></div><div class="contact-panel"><h2>Antes do contato</h2><p>Organize uma descrição objetiva do que aconteceu e separe documentos, contratos, comprovantes ou mensagens relacionadas.</p><p>Não envie dados sensíveis neste projeto demonstrativo.</p><a class="btn btn-main" href="https://wa.me/${office.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de solicitar informações sobre atendimento jurídico.')}">Abrir WhatsApp</a></div></div></section>` }))

pages.set('politica-de-privacidade/', layout({ title: 'Política de Privacidade | Moura & Vasconcelos Advocacia', description: 'Política demonstrativa de privacidade do projeto Moura & Vasconcelos Advocacia.', route: 'politica-de-privacidade/', body: `${pageHero('Política de privacidade', 'Informações gerais sobre o tratamento de dados neste projeto demonstrativo.', [['politica-de-privacidade/','Política de privacidade']])}<section class="section"><div class="container prose"><h2>Projeto demonstrativo</h2><p>Este site não representa um escritório real e não deve receber informações pessoais sensíveis.</p><h2>Contato pelo WhatsApp</h2><p>Ao utilizar o link de contato, o usuário é direcionado para um serviço externo, sujeito às políticas da respectiva plataforma.</p><h2>Produção futura</h2><p>Antes do uso real, esta política deve ser revisada conforme os dados, ferramentas e finalidades efetivamente utilizados.</p></div></section>` }))

const notFound = `${head({ title: 'Página não encontrada | Moura & Vasconcelos', description: 'A página solicitada não foi encontrada.', route: '404/' })}<body data-prerendered="true">${header()}<main id="main-content">${pageHero('Página não encontrada', 'O endereço pode estar incorreto ou a página pode ter sido removida.', [['404/','Erro 404']])}<section class="section"><div class="container"><a class="btn btn-main" href="${link()}">Voltar ao início</a></div></section></main>${footer()}</body></html>`

const admin = `${head({ title: 'Painel de conteúdo | Moura & Vasconcelos', description: 'Área administrativa demonstrativa.', route: 'admin/' })}<body><main class="admin"><section class="admin-card"><span class="eyebrow">Área administrativa</span><h1>Painel de conteúdo</h1><p>Este projeto foi publicado em modo demonstrativo. A gestão dos arquivos é realizada diretamente no repositório GitHub.</p><a class="btn btn-main" href="https://github.com/RicardoRibeiro-Prof/moura-vasconcelos-advocacia" target="_blank" rel="noopener noreferrer">Abrir repositório</a><p><a href="${link()}">← Voltar ao site</a></p></section></main></body></html>`

await fs.rm(dist, { recursive: true, force: true })
await fs.mkdir(path.join(dist, 'assets'), { recursive: true })
await fs.writeFile(path.join(dist, 'assets/styles.css'), styles)
await fs.writeFile(path.join(dist, 'assets/app.js'), appJs)
await fs.writeFile(path.join(dist, 'assets/favicon.svg'), favicon)
await fs.writeFile(path.join(dist, 'assets/social-share.svg'), share)
await fs.writeFile(path.join(dist, 'manifest.webmanifest'), JSON.stringify({ name: office.name, short_name: office.short, start_url: basePath, scope: basePath, display: 'browser', theme_color: '#123f36', background_color: '#fffdf9', icons: [{ src: `${basePath}assets/favicon.svg`, sizes: 'any', type: 'image/svg+xml' }] }, null, 2))
await fs.writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n')
await fs.writeFile(path.join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n')
await fs.writeFile(path.join(dist, '.nojekyll'), '')

for (const [route, html] of pages) {
  const directory = path.join(dist, route)
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, 'index.html'), html)
}
await fs.mkdir(path.join(dist, 'admin'), { recursive: true })
await fs.writeFile(path.join(dist, 'admin/index.html'), admin)
await fs.writeFile(path.join(dist, '404.html'), notFound)

console.log(`Site gerado: ${pages.size} páginas públicas, painel e página 404.`)
