/** Borra los datos guardados de la demostración y vuelve a los de ejemplo. */
export function resetDemo() {
  try {
    localStorage.removeItem('anai-comunica.demo.v1');
    localStorage.removeItem('comunica.token');
    localStorage.removeItem('comunica.nudge.hidden');
  } catch { /* sin almacenamiento */ }
  window.location.hash = '';
  window.location.reload();
}
