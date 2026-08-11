(function registerCharacterMotion(app) {
app.initCharacterMotion = function initCharacterMotion(root = document) {
  const stage = root.querySelector('[data-character-stage]');
  const character = root.querySelector('[data-character]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const precisePointer = window.matchMedia('(pointer: fine)').matches;
  if (!stage || !character || reduceMotion || !precisePointer) return;

  stage.addEventListener('pointermove', (event) => {
    const box = stage.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * 8;
    const y = ((event.clientY - box.top) / box.height - 0.5) * 6;
    character.style.setProperty('--character-x', `${x}px`);
    character.style.setProperty('--character-y', `${y}px`);
  });
  stage.addEventListener('pointerleave', () => {
    character.style.setProperty('--character-x', '0px');
    character.style.setProperty('--character-y', '0px');
  });
};
})(window.ErikaApp = window.ErikaApp || {});
