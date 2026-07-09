# Setup Guide

## 1) Foundation scope
This repository contains the initial content and component foundation for an interactive 3D cyberpunk portfolio.

## 2) Domain plan
- Primary site: `https://cianomalley.works`
- Demos and documentation: `https://cianomalley.dev`
- Configure DNS so `cianomalley.works` routes to the production frontend and `cianomalley.dev` routes to demos/docs hosting.

## 3) Run validation tests
```bash
npm test
```

## 4) Next implementation step
Use `src/data/*.json` as the single source of truth for navigation and content categories, then wire these models into your chosen web stack and 3D renderer.
