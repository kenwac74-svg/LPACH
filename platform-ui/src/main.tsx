const query = new URLSearchParams(window.location.search);
const forceMobilePreview = query.get('preview') === 'mobile';
const mobileMedia = window.matchMedia('(max-width: 1023px)');

if (forceMobilePreview || mobileMedia.matches) {
  import('./mobile-entry.jsx');
} else {
  import('./desktop-entry.tsx');

  mobileMedia.addEventListener('change', (event) => {
    if (event.matches) window.location.reload();
  });
}
