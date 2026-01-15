import { registerApplication, start } from 'single-spa';

// Register React 16 app
registerApplication({
  name: '@myapp/react16',
  app: () => System.import('@myapp/react16'),
  activeWhen: (location) => {
    // React 16 handles these routes
    const path = location.pathname;
    // Handle root path separately to avoid matching all paths
    if (path === '/' || path === '/home' || path === '/about' || path === '/contact') {
      return true;
    }
    // Match subpaths (but not for root '/')
    return ['/home', '/about', '/contact'].some(route =>
      path.startsWith(route + '/')
    );
  },
});

// Register Vite (React 19) app
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
