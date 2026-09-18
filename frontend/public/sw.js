/* Service worker de Anai Comunica: recibe notificaciones push y abre la pantalla correcta. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { title: 'Anai Comunica', body: event.data?.text() }; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'Anai Comunica', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      data: { url: data.url || '/' },
      tag: data.url || undefined,
      renotify: !!data.url,
      lang: 'es',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url.startsWith(self.location.origin) && 'focus' in w) {
          w.navigate(url);
          return w.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
