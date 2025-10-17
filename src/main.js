import { arrowBounce } from './js/arrow-bounce.js';
import { generalAnimations } from './js/general-animations.js';
import { typeWriterAnimation } from './js/typewriter.js';
import globalAnimations from "./js/global-animations.js";

document.addEventListener('DOMContentLoaded', () => {
  // Global animations
  document.querySelectorAll('.js-gsap').forEach((rootEl) => globalAnimations(rootEl));

  typeWriterAnimation();
  generalAnimations()
  arrowBounce()
});
