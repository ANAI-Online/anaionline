import { useState } from 'react';
import { api } from '../../api/client';
import type { AccessLink, AccountStatus } from '../../api/types';
import { Icon } from '../../components/icons';
import { Sheet, useAction, useToast } from '../../components/ui';

export function StatusBadge({ status }: { status: AccountStatus }) {
  const map = { activa: ['b-green', 'Activa'], invitada: ['b-amber', 'Sin activar'], inactiva: ['b-gray', 'Inactiva'] } as const;
  const [tone, label] = map[status];
  return <span className={`badge ${tone}`}>{label}</span>;
}

export const RELATIONSHIPS = ['Madre', 'Padre', 'Abuela', 'Abuelo', 'Tía', 'Tío', 'Hermana', 'Hermano', 'Otro'];
export const TITLES = ['', 'Lcda.', 'Lic.', 'Msc.', 'Mgs.', 'Ing.', 'Dra.', 'Dr.', 'Prof.'];
export const SUBJECTS = [
  'Lengua y Literatura', 'Matemática', 'Ciencias Naturales', 'Estudios Sociales', 'Inglés', 'Educación Física',
  'Educación Cultural y Artística', 'Física', 'Química', 'Biología', 'Historia', 'Filosofía',
  'Educación para la Ciudadanía', 'Emprendimiento y Gestión', 'Informática', 'Desarrollo Humano Integral',
];

/** Muestra el enlace de acceso para compartirlo por WhatsApp o copiarlo. */
export function AccessLinkSheet({ person, link, onClose }: { person: { full_name: string; email: string }; link: AccessLink; onClose: () => void }) {
  const toast = useToast();
  const message = `Hola, ${person.full_name.split(' ')[0]}. Este es tu enlace para entrar a la plataforma de comunicación del colegio. Tu usuario es ${person.email}: ${link.url}`;
  return (
    <Sheet title="Enlace de acceso" onClose={onClose}>
      <p>
        {link.email_sent
          ? <>Estamos enviando el enlace a <strong>{person.email}</strong>; puede tardar unos minutos. Si no le llega (que revise también el correo no deseado), compártelo por WhatsApp.</>
          : <>El correo no está disponible en el servidor, así que el enlace no se envió. Compártelo con <strong>{person.full_name}</strong>.</>}
      </p>
      <div className="card pad small" style={{ wordBreak: 'break-all' }}>{link.url}</div>
      <p className="hint">Es personal y de un solo uso. Una invitación vence en 14 días; un enlace para restablecer, en 2 horas.</p>
      <div className="row-gap">
        <a className="btn btn-primary" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
        <button className="btn btn-outline" onClick={async () => {
          try { await navigator.clipboard.writeText(link.url); toast('Enlace copiado'); } catch { toast('Mantén presionado el enlace para copiarlo'); }
        }}>Copiar enlace</button>
      </div>
    </Sheet>
  );
}

/** Botón que pide un enlace de acceso y abre la hoja para compartirlo. */
export function AccessLinkButton({ person, disabled }: { person: { id: string; full_name: string; email: string }; disabled?: boolean }) {
  const [link, setLink] = useState<AccessLink | null>(null);
  const { busy, run } = useAction();
  return (
    <>
      <button className="btn btn-sm btn-outline" disabled={busy || disabled} onClick={async () => {
        const l = await run(() => api.post<AccessLink>(`/admin/users/${person.id}/access-link`));
        if (l) setLink(l);
      }}><Icon name="send" size={16} />Enlace de acceso</button>
      {link && <AccessLinkSheet person={person} link={link} onClose={() => setLink(null)} />}
    </>
  );
}
