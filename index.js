(() => {
  try {
    const root = document.getElementById('root');
    if (!root) return;
    root.innerHTML = `
      <div style="color:#e5e7eb; font-family: Inter, sans-serif; padding:24px;">
        <h1 style="font-size:20px; margin:0 0 12px;">Direct Option — Deployment OK</h1>
        <p style="margin:0 0 12px;">This is a placeholder client script served as <code>index.js</code>. Your original app (TypeScript/React) needs to be compiled to JavaScript and included here for the full UI to load.</p>
        <p style="margin:0">To restore your app: either add a build step (package.json + build output) or replace this file with your compiled bundle.</p>
        <p style="margin-top:12px;"><a href="https://github.com/vanniekerkeugene2-ux/Direct-option-" target="_blank" style="color:#60a5fa;">View repository on GitHub</a></p>
      </div>
    `;
    console.log('index.js loaded — placeholder content inserted.');
  } catch (err) {
    console.error(err);
    const root = document.getElementById('root');
    if (root) root.textContent = 'An error occurred while loading the app. See console for details.';
  }
})();
