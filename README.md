# 3DPlayground

Interactive 3D scene built with **Three.js** and bundled via **Vite**.  
The project demonstrates modern WebGL practices: ES modules, asset pipelines, procedural geometry, custom typography, and responsive rendering.  
It is deployed on **Vercel** and consumed inside **Webflow** through an iframe embed.

---

## Features

- **Three.js ES Module setup** with `OrbitControls`, `FontLoader`, and `TextGeometry`.
- **Custom 3D typography** (`Play Inside Ideas` + `COMING SOON`) with precise layout control.
- **Animated torus field** with randomized spin, scale, and distribution.
- **Responsive renderer** with DPI awareness (`setPixelRatio`) and resize handling.
- **Transparent background** for seamless Webflow integration.
- **Vite-powered build pipeline** for fast local iteration and production bundling.
- **CI/CD ready**: auto-deploy from GitHub to Vercel.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) ≥ 18
- npm (comes with Node)

### Install & Run

```bash
git clone https://github.com/csabogalortiz/3DPlayground.git
cd 3DPlayground
npm install

# Local development
npm run dev

# Production build
npm run build
npm run preview
