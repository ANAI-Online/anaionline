# Anai Comunica

Plataforma de comunicación entre la Unidad Educativa Anai y las familias (Ecuador).
Comunicados, mensajes, novedades y agenda (eventos, confirmación de asistencia y citas con docentes), con administración de cuentas y notificaciones push y por correo. Sin calificaciones.

**Para ponerla en línea, sigue [GUIA-DESPLIEGUE.md](GUIA-DESPLIEGUE.md).**

## Arranque rápido

Requisitos: Node.js 20 o superior.

```bash
# 1. API (usa un PostgreSQL embebido si no defines DATABASE_URL)
cd backend
npm install
npm run seed      # carga datos de demostración
npm run dev       # http://localhost:4000/api

# 2. App web (en otra terminal)
cd frontend
npm install
npm run dev       # http://localhost:5173
```

Cuentas de demostración (contraseña `comunica123`):

| Rol | Correo |
| --- | --- |
| Representante (Mateo, 5.º EGB B y Lucía, 2.º EGB A) | carmen.andrade@demo.ec |
| Representante | luis.torres@demo.ec, rosa.paredes@demo.ec, diego.cedeno@demo.ec, ana.mora@demo.ec |
| Docente, tutora de 5.º EGB B | andrea.ruiz@demo.ec |
| Docente, Ciencias Naturales | jorge.salas@demo.ec |
| Docente, tutora de 2.º EGB A | maria.leon@demo.ec |
| Dirección | direccion@demo.ec |

Demostración sin servidor: `cd frontend && npm run build:demo` genera `dist-demo/index.html`, un único archivo con datos simulados en el navegador.

## Estructura

```
backend/   Node + Express 5 + TypeScript, SQL directo sobre PostgreSQL (o PGlite en desarrollo)
  src/db/schema.sql      Esquema completo
  src/db/seed.ts         Datos de demostración
  src/routes/            Un módulo por área (comunicados, mensajes, novedades, agenda, citas, panel)
  src/access.ts          Quién puede ver y escribir a quién
  test/api.test.ts       Pruebas de los flujos principales (npm test)
frontend/  React 19 + Vite + TypeScript, sin librerías de UI
  src/pages/             Inicio, Comunicados, Mensajes, Novedades, Agenda, Panel
  src/api/demo.ts        API simulada para el modo demostración
  src/styles.css         Sistema visual (claro y oscuro)
```

## Reglas de negocio implementadas

- Tres roles: dirección, docente y representante. Solo dirección envía a todo el colegio; cada docente escribe únicamente a sus cursos.
- Comunicados de tres tipos: informativo (se registra quién lo abrió), confirmar lectura y autorización. La autorización se responde por cada estudiante, con fecha límite y registro de fecha y hora.
- Un comunicado puede crear un evento en la agenda con confirmación de asistencia (asistiré, tal vez, no podré).
- Seguimiento en tiempo real para quien envía, con recordatorio a pendientes en un toque.
- Mensajes siempre ligados a un estudiante, y solo entre representantes y docentes que atienden a ese estudiante. Horario de atención por docente: fuera de él no se le notifica y la familia lo ve antes de escribir.
- Cualquier participante puede reportar un mensaje; dirección los revisa en Moderación.
- Citas: el docente publica bloques que se parten en horarios; la familia elige uno y el docente confirma. La base de datos impide reservar dos veces el mismo horario.
- Panel de dirección: tasa de lectura, familias activas, tiempo típico de respuesta, autorizaciones pendientes, mensajes sin responder en 48 h, por curso.
- Hora de Ecuador continental (UTC−5) en toda la app.

## Variables de entorno (backend)

| Variable | Uso |
| --- | --- |
| `DATABASE_URL` | PostgreSQL en producción. Sin ella se usa PGlite en `PGLITE_DIR`. |
| `JWT_SECRET` | Obligatoria en producción. |
| `CORS_ORIGIN` | Dominios de la app web, separados por comas. |
| `PORT` | Puerto de la API (4000 por defecto). |

En el frontend, `VITE_API_URL` apunta a la API si no se sirve en el mismo dominio.

## Administración y notificaciones (fase 2)

- Dirección administra cursos (Inicial 1 a 3.º BGU), tutorías, docentes con sus materias, estudiantes y representantes, y puede importar todo desde Excel con revisión previa.
- Nadie recibe contraseñas: cada cuenta recibe un enlace de invitación de un solo uso (14 días) por correo, o dirección lo comparte por WhatsApp. Incluye recuperar y cambiar contraseña.
- Push con Web Push (la app es instalable). Las claves VAPID se generan y guardan solas si no se definen.
- Correo por SMTP (Google Workspace, Amazon SES, Brevo…), con prioridades: lo importante siempre; lo demás, solo si la persona no tiene push o eligió «Todo».
- Recordatorios automáticos cada 10 minutos: plazos que vencen, eventos y citas del día siguiente.
- Registro de envíos en Administración › Envíos.

Comandos útiles del backend: `npm run create-admin -- --email … --name "…"`, `npm run vapid`, `npm test`. Las variables están en `backend/.env.example`.

## Siguiente fase

- Subida de archivos adjuntos y fotos para Novedades, con consentimiento de los representantes (LOPDP).
- Recordatorios automáticos antes del plazo y del evento.
- App móvil (PWA instalable o React Native reutilizando la misma API).
