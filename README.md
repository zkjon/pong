# 🏓 Pong Game

A classic Pong game built with modern web technologies.

## 🚀 Technologies Used

- **[Astro](https://astro.build/)** - Static site generator web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for JavaScript
- **[Preact](https://preactjs.com/)** - Lightweight React alternative for game logic
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling

## 🎮 Features

- Fully functional 2-player Pong game
- Responsive keyboard controls
- Scoring system
- Realistic collision physics
- Modern interface with visual effects
- Modular, well-typed codebase

## 🎯 Controls

- **Player 1**: 
    - `W` - Move paddle up
    - `S` - Move paddle down

- **Player 2**: 
    - `↑` - Move paddle up
    - `↓` - Move paddle down

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone <your-repository>
cd pong
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:4321`

## 📦 Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                            |
| `npm run dev`             | Start development server at `localhost:4321`    |
| `npm run build`           | Build the site for production in `./dist/`      |
| `npm run preview`         | Preview the local build                         |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`|
| `npm run astro -- --help` | Get help using Astro CLI                        |

## 🏗️ Project Structure

```
/
├── public/               # Static files
├── src/
│   ├── components/       # Preact components
│   │   └── PongGame.tsx  # Main game component
│   ├── hooks/            # Custom hooks
│   │   └── useKeyboard.ts
│   ├── layouts/          # Astro layouts
│   │   └── Layout.astro
│   ├── pages/            # Site pages
│   │   └── index.astro
│   ├── styles/           # Global styles
│   │   └── global.css
│   ├── types/            # TypeScript type definitions
│   │   └── game.ts
│   └── utils/            # Game utilities
│       └── gameUtils.ts
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Technical Highlights

- **Modular architecture**: Clear separation between logic, types, and utilities
- **Strong typing**: TypeScript throughout for robustness
- **Custom hooks**: Efficient keyboard event handling
- **Canvas API**: Smooth, efficient game rendering
- **Responsive design**: Adapts to different screen sizes
- **Visual effects**: Modern animations and styles with Tailwind

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🎯 Upcoming Features

- [ ] AI for single player mode
- [ ] Multiple difficulty levels
- [ ] Sound effects
- [ ] Online multiplayer mode
- [ ] Different visual themes
- [ ] Achievement system

---

Enjoy playing Pong! 🏓

