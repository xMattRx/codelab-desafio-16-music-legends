# 🎵 CodeLab - Desafio 16: Music Legends

Este repositório contém a solução para o **Desafio 16** do curso **CodeLab**, com o projeto **Music Legends**, um player de músicas estilo Spotify, com integração ao YouTube, recursos interativos e persistência local. O foco do desafio está na componentização, controle de estado global e experiência do usuário fluida e responsiva.

---

## 🧪 Tecnologias utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React YouTube](https://github.com/tjallingt/react-youtube)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

## 📂 Estrutura do projeto

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── PlayerControls.tsx
│   │   ├── FilledPlayButton.tsx
│   │   └── ProgressBar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Library.tsx
│   ├── store/
│   │   └── musicStore.ts
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/codelab-desafio-16-music-legends.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd codelab-desafio-16-music-legends
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---

## 📸 Preview

> *(Adicione aqui uma imagem de preview do projeto ou um GIF)*  
> Exemplo:
>
> ![Preview do projeto](./src/assets/preview.png)

---

## 🎯 Funcionalidades

- 🎵 Reprodução de músicas via YouTube embed  
- ▶️ Botões de play/pause, next e previous  
- 🔁 Repeat e 🔀 Shuffle com estado global  
- ❤️ Marcar/desmarcar como favorita (persistência local)  
- 📶 Controle de volume com animação  
- 📈 Barra de progresso sincronizada com a música  
- 💾 Biblioteca de músicas com formulário de adição

---

## 🧠 Aprendizados

- Gerenciamento global de estado com Zustand  
- Integração com API do YouTube Player  
- Comportamentos reativos com hooks e useRef  
- Componentização inteligente e reutilizável  
- Responsividade com Tailwind CSS  
- Persistência local usando localStorage

---

## 🕹️ Demonstração

> *(Adicione aqui o link do projeto publicado no Vercel ou outro serviço)*  
> Exemplo:
>
> 🔗 https://codelab-desafio-16-music-legends.vercel.app

---
