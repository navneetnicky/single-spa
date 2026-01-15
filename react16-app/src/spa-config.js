import { registerApplication, start } from 'single-spa';

// Register React 16 app
registerApplication({
  name: '@myapp/react16',
  app: () => System.import('@myapp/react16'),
  activeWhen: (location) => {
    const path = location.pathname;
    // React 16 handles these routes
    if (path === '/' || path === '/home' || path === '/about' || path === '/contact') {
      return true;
    }
    // Match subpaths
    return ['/home', '/about', '/contact'].some(route =>
      path.startsWith(route + '/')
    );
  },
});

// Register Vite (React 18) app
registerApplication({
  name: '@myapp/vite',
  app: () => System.import('@myapp/vite'),
  activeWhen: (location) => {
    // Vite app handles these routes
    return ['/dashboard', '/profile', '/settings'].some(route =>
      location.pathname === route || location.pathname.startsWith(route + '/')
    );
  },
});

// Start single-spa
start({
  urlRerouteOnly: true,
});

// Optional: Log app transitions for debugging
window.addEventListener('single-spa:before-routing-event', () => {
  console.log('Single-SPA: Routing...');
});

window.addEventListener('single-spa:routing-event', () => {
  console.log('Single-SPA: Route changed to:', window.location.pathname);
});
