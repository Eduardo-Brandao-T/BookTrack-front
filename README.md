# 📚 BookTrack – Catálogo de Leitura

Uma aplicação web responsiva para **catalogar livros, registrar resenhas e acompanhar estatísticas de leitura**.  
Feita com **React**, **TypeScript** e um design **minimalista em tons de verde**, inspirado no estilo **Ghibli**.

---

## 🌿 Visão Geral

O **BookTrack** permite que o usuário:
- Faça login (ou cadastro) com e-mail ou Google;
- Adicione seus livros e gerencie sua biblioteca pessoal;
- Escreva resenhas e avaliações;
- Veja estatísticas de leitura (páginas lidas, livros concluídos, etc.);
- Navegue por uma interface leve, fluida e agradável.

---

## 🧱 Tecnologias Principais

| Categoria | Ferramenta |
|------------|-------------|
| Frontend Framework | [React](https://react.dev/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS](https://tailwindcss.com/) |
| Gerenciamento de Estado | [Zustand](https://zustand-demo.pmnd.rs/) |
| Roteamento | [React Router](https://reactrouter.com/) |
| Requisições HTTP | [Axios](https://axios-http.com/) |
| Autenticação | OAuth2 (via backend NestJS) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Design System | Customizado (verde natural e minimalista) |

---

## 🧭 Estrutura de Pastas
```text
├── public/               # Ícones, manifest e imagens estáticas
├── src/
│   ├── assets/           # Logos, ilustrações (folhas, caneca, livros etc.)
│   ├── components/       # Componentes reutilizáveis (Button, Card, Input)
│   ├── pages/            # Páginas (Login, Cadastro, Biblioteca, Perfil, Estatísticas)
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # Contextos globais (auth, tema, etc.)
│   ├── services/         # Integração com a API (axios configs)
│   ├── styles/           # Arquivos CSS globais ou Tailwind config
│   ├── utils/            # Funções auxiliares
│   └── main.tsx
├── .env.example          # Variáveis de ambiente
├── package.json
└── README.md
```

## ⚙️ Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/BookTrack-front.git
cd BookTrack-front
npm install   # ou yarn install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo .env baseado em .env.example

### 3. Rodar o servidor de desenvolvimento
```npm run dev```

### 4. Build para Produção
```npm run build```

## 🧩 Integração com o Backend
O backend é feito em NestJS, com microsserviços e RabbitMQ.
Você pode encontrar o repositório em:
link

## Fluxo principal:

Login com Google → JWT recebido → salvo no localStorage.

Todas as chamadas à API usam Authorization: Bearer <token>.

## 🎨 Identidade Visual
Paleta principal:

Verde matcha: #8FBF7A

Bege suave: #F8F5F0

Verde escuro (detalhes): #3C6E47

Estilo: natural, minimalista, inspirado em Ghibli.

Tipografia: Poppins ou Inter.

## 🧪 Testes
npm run test

## 📱 Responsividade
O layout foi projetado para:

📱 Smartphones (até 480px)

💻 Tablets (até 768px)

🖥️ Desktop (1080px+)

A UI se adapta automaticamente — testada no modo mobile do Chrome DevTools.
