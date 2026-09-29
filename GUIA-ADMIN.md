# 📋 GUIA DO SISTEMA INTEGRADO

## 🎯 Como Funciona

### 1️⃣ **Acessar o Menu Admin**
- No site, procure o botão com **3 pontos verticais** (⋮) no canto superior direito
- Clique nele para abrir o menu dropdown

### 2️⃣ **Opções do Menu**
O menu tem 2 opções:

#### 🔐 **Área do Admin**
- Login: `Anizzolavojesus`
- Senha: `bucomaxilofacial2026`
- Acesso completo ao painel administrativo

#### 👤 **Área do Paciente**
- Para pacientes consultarem documentos
- Sistema em desenvolvimento

---

## ⚙️ **Painel Administrativo**

Após fazer login como admin, você terá acesso a:

### 📝 **Gerenciar Blog**
- ✅ Criar novos posts
- ✅ Editar posts existentes
- ✅ Excluir posts
- ✅ Upload de imagens (drag & drop)
- ✅ Categorização de posts
- ✅ Preview ao vivo

### 📧 **Mensagens** (Em breve)
- Visualizar mensagens do formulário de contato

### ⚙️ **Configurações** (Em breve)
- Editar informações gerais do site
- Alterar dados de contato
- Configurar integrações

---

## 🔒 **Alterar Senha do Admin**

Edite o arquivo `admin-integrated-fixed.js` na linha 4:

```javascript
const ADMIN_PASS = 'SUA_SENHA_AQUI';
```

---

## 🎨 **Recursos Implementados**

✅ Menu dropdown com 3 pontos
✅ Modal de login profissional
✅ Painel admin em tela cheia
✅ Sistema de abas (tabs)
✅ Editor de posts completo
✅ Upload de imagens com drag & drop
✅ Lista de posts com edição/exclusão
✅ Integração automática com o site
✅ Design responsivo
✅ Animações suaves
✅ Validação de formulários
✅ Mensagens de sucesso/erro
✅ Máscara de CPF (área do paciente)

---

## 📱 **Como Usar no Dia a Dia**

### Para o Dr. postar no blog:

1. **Acesse o site** (`index.html`)
2. **Clique nos 3 pontos** (⋮) no header
3. **Selecione "Área do Admin"**
4. **Faça login** (Anizzolavojesus/bucomaxilofacial2026)
5. **Preencha o formulário** com:
   - Título do post
   - Resumo (breve descrição)
   - Conteúdo completo
   - Categoria
   - Imagem (opcional)
6. **Clique em "Publicar"**
7. O post aparece **automaticamente** no site!

### Para editar um post:

1. No painel admin, veja a **lista de posts** à direita
2. Clique em **"Editar"** no post desejado
3. Faça as alterações
4. Clique em **"Publicar"**

### Para excluir um post:

1. Na lista de posts, clique em **"Excluir"**
2. Confirme a exclusão

---

## 🌐 **Visualização Pública**

Os visitantes do site verão os posts na seção **Blog** sem precisar de login.
Apenas o admin pode criar, editar e excluir posts.

---

## 🔄 **Sincronização**

Todos os dados são salvos no **localStorage** do navegador.
Para backup, você pode exportar os dados ou conectar a um banco de dados real.

---

## 📞 **Suporte**

Para dúvidas ou personalizações:
- Os arquivos principais são: `index.html`, `admin-integrated-fixed.js`, `style.css`
- Tudo está comentado e organizado
- Código limpo e fácil de modificar

---

**Desenvolvido para facilitar o gerenciamento do site do Dr. Bucomaxilo! 🦷✨**
