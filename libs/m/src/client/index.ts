import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
app.renderer.autoDensity = true;

document.body.appendChild(app.view);
