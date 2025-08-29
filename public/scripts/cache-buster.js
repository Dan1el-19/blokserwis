// Aggressive cache busting and URL correction script
(function() {
  // Clear all possible caches
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });
  }
  
  // Clear application cache (deprecated but some browsers still use it)
  if (window.applicationCache) {
    window.applicationCache.update();
  }
  
  // Force reload if current URL looks problematic
  const href = window.location.href;
  const domain = window.location.origin;
  
  // If accessing .html files directly - redirect to clean URLs
  if (href.includes('.html')) {
    let cleanPath = href.replace(domain, '');
    
    // Map .html files to their clean URLs
    const urlMap = {
      '/index.html': '/',
      '/kontakt.html': '/kontakt',
      '/uslugi.html': '/uslugi', 
      '/realizacje.html': '/realizacje',
      '/zaufalinam.html': '/zaufalinam',
      '/domofony_lodz.html': '/domofony-lodz',
      '/wideodomofony_lodz.html': '/wideodomofony-lodz',
      '/monitoring_lodz.html': '/monitoring-lodz',
      '/naprawa_monitoringu_lodz.html': '/naprawa-monitoringu-lodz',
      '/naprawa_wideodomofonow_lodz.html': '/naprawa-wideodomofonow-lodz',
      '/konserwacja_domofonow_lodz.html': '/konserwacja-domofonow-lodz',
      '/montaz_wideodomofonow_lodz.html': '/montaz-wideodomofonow-lodz',
      '/serwis_domofonow_lodz.html': '/serwis-domofonow-lodz',
      '/serwis_wideodomofonow_lodz.html': '/serwis-wideodomofonow-lodz'
    };
    
    // Strip query params for mapping
    const pathOnly = cleanPath.split('?')[0].split('#')[0];
    
    if (urlMap[pathOnly]) {
      window.location.replace(domain + urlMap[pathOnly]);
      return;
    }
  }
  
  // Force refresh timestamp in localStorage to detect version changes
  const currentVersion = '20250829-v2';
  const storedVersion = localStorage.getItem('blokserwis-version');
  
  if (storedVersion !== currentVersion) {
    // Clear browser caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    localStorage.setItem('blokserwis-version', currentVersion);
    
    // Force hard reload only once per version
    if (storedVersion && !window.location.search.includes('cache-bust')) {
      window.location.href = window.location.href + (window.location.search ? '&' : '?') + 'cache-bust=' + Date.now();
      return;
    }
  }
})();
