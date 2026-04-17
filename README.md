# Poppr-MenuAnimation

A beautiful animated menu using standard HTML/CSS and GSAP with Split-Type for text animations, served through a modern Vite workflow.

## Features
- **GSAP Animations**: Smooth transitions for opening and closing the menu using SVG paths.
- **Split-Type**: Text is broken down and animated per-character for a dynamic effect.
- **Vite Setup**: Super fast development server and optimized build process.
- **Local Fonts**: `Boldonse` and `Google Sans Flex` are hosted locally.

## Getting Started

1. Clone the project or install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server using Vite:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the localhost link provided by Vite.

## Build for Production
To create a production-ready bundle, run:
```bash
npm run build
```
This will compile your assets into the `dist/` directory.

## Project Structure
- `index.html`: Main entry point structure.
- `script.js`: GSAP and related application logic.
- `styles.css`: Visual styling, `@font-face` rules.
- `public/fonts/`: Contains the `.ttf` files for local custom fonts.
- `public/assets/`: Image resources.

## Credits / Inspiration
The menu design and structural animations were heavily inspired by [Poppr](https://www.poppr.be/en).
