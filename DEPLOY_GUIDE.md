# 🚀 Guia Completo de Deploy - Portfólio Online

Este guia explica como publicar o seu portfólio em diferentes plataformas gratuitas.

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de:

1. ✅ Personalizar todas as informações pessoais no `index.html`
2. ✅ Substituir "seudominio.com" pelos URLs reais no:
   - `index.html` (meta tags)
   - `robots.txt`
   - `sitemap.xml`
3. ✅ Testar localmente (abrir `index.html` no navegador)

## 🌐 Plataformas de Deploy Gratuitas

### 1. 🏆 GitHub Pages (Recomendado)

**Vantagens:** Integração com Git, domínio personalizado, HTTPS automático

**Passos:**
1. Crie uma conta no [GitHub](https://github.com)
2. Crie um novo repositório público
3. Faça upload de todos os ficheiros
4. Vá a Settings → Pages
5. Selecione "Deploy from a branch" → "main"
6. URL: `https://seuusername.github.io/nome-repositorio`

**Comandos Git (se souber usar):**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/seuusername/portfolio.git
git push -u origin main
```

### 2. 🚀 Netlify (Mais Fácil)

**Vantagens:** Deploy instantâneo, domínio personalizado grátis

**Passos:**
1. Vá a [netlify.com](https://netlify.com)
2. Arraste a pasta do portfólio para o site
3. Ou conecte com GitHub para deploy automático
4. URL: `https://nome-aleatorio.netlify.app`

### 3. ⚡ Vercel

**Vantagens:** Performance excelente, deploy automático

**Passos:**
1. Vá a [vercel.com](https://vercel.com)
2. Conecte com GitHub
3. Selecione o repositório
4. Deploy automático
5. URL: `https://portfolio-seuusername.vercel.app`

### 4. 🔥 Firebase Hosting

**Vantagens:** Google Cloud, muito rápido

**Passos:**
1. Instale Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting`
4. `firebase deploy`

## 🎯 Configuração Personalizada

### Domínio Personalizado

**Para GitHub Pages:**
1. Compre um domínio (ex: Namecheap, GoDaddy)
2. Settings → Pages → Custom domain
3. Configure DNS: CNAME para `seuusername.github.io`

**Para Netlify:**
1. Domain settings → Add custom domain
2. Configure DNS nos servidores do Netlify

### SSL/HTTPS
Todas as plataformas fornecem HTTPS automático. ✅

## 📈 SEO e Performance

### Antes do Deploy:
1. **Personalize meta tags** no `index.html`:
   ```html
   <meta name="description" content="Sua descrição aqui">
   <meta property="og:title" content="Seu Nome - Seu Título">
   <meta property="og:url" content="https://seudominio.com">
   ```

2. **Atualize sitemap.xml** com seu domínio real

3. **Configure robots.txt** com seu domínio

4. **Teste performance** com [PageSpeed Insights](https://pagespeed.web.dev/)

### Depois do Deploy:
1. **Google Search Console**: Adicione seu site
2. **Google Analytics**: Adicione tracking (opcional)
3. **Teste mobile**: Verifique em diferentes dispositivos

## 🔧 Monitorização

### Ferramentas Úteis:
- **PageSpeed Insights**: Performance
- **GTmetrix**: Velocidade de carregamento
- **Mobile-Friendly Test**: Compatibilidade mobile
- **SSL Checker**: Verificar certificado

## 🆘 Resolução de Problemas

### Site não carrega:
- Verifique se todos os ficheiros foram enviados
- Confirme que `index.html` está na raiz
- Aguarde alguns minutos para propagação DNS

### CSS/JS não funciona:
- Verifique caminhos dos ficheiros
- Confirme que não há erros no console
- Teste localmente primeiro

### Formulário não funciona:
- O formulário atual é apenas demonstração
- Para formulários funcionais, use:
  - Netlify Forms (automático no Netlify)
  - Formspree
  - EmailJS

## 📱 Testes Finais

Antes de partilhar o link:

1. ✅ Teste em diferentes navegadores (Chrome, Firefox, Safari)
2. ✅ Teste em dispositivos móveis
3. ✅ Verifique todos os links
4. ✅ Teste formulário de contacto
5. ✅ Confirme informações pessoais
6. ✅ Teste velocidade de carregamento

## 🎉 Depois do Deploy

### Partilhe o seu portfólio:
1. **CV/Currículo**: Adicione o link
2. **LinkedIn**: Atualize perfil
3. **Redes Sociais**: Partilhe o link
4. **Email Signature**: Inclua o URL

### Manutenção:
- Atualize projetos regularmente
- Adicione novos trabalhos
- Mantenha tecnologias atualizadas
- Monitore performance

## 🔗 Links Úteis

- [GitHub Pages Documentation](https://pages.github.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Can I Use - Compatibilidade](https://caniuse.com/)

---

**💡 Dica Final:** Comece com Netlify se quer algo rápido, ou GitHub Pages se quer aprender Git. Ambos são excelentes!

**🆘 Precisa de ajuda?** Consulte a documentação da plataforma escolhida ou procure tutoriais no YouTube.
