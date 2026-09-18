# Anai Comunica: guía para ponerlo en línea

Esta guía deja la plataforma funcionando en `https://comunica.anai.edu.ec` para una revisión con un grupo piloto. La puede seguir cualquier persona con acceso a la configuración del dominio `anai.edu.ec`; no hace falta programar.

Tiempo estimado: una tarde. Lo que más demora es la propagación del DNS (de minutos a unas horas).

## Qué necesitas antes de empezar

- Una cuenta de GitHub (gratuita) para guardar el código.
- Una cuenta en Render (render.com) con una tarjeta para los planes pagos.
- Acceso a la zona DNS de `anai.edu.ec` (suele tenerlo quien administra el correo institucional o el proveedor del dominio).
- El correo que usará dirección para entrar, por ejemplo `direccion@anai.edu.ec`.

## 1. Subir el código a GitHub

1. En GitHub, crea un repositorio **privado** llamado `anai-comunica`.
2. Descomprime `anai-comunica.zip` y sube todo su contenido al repositorio (botón «Add file › Upload files», arrastrando las carpetas). La raíz del repositorio debe contener `render.yaml`, `package.json`, `backend/` y `frontend/`.

## 2. Crear el servidor y la base de datos en Render

1. En Render: **New › Blueprint** y conecta el repositorio `anai-comunica`.
2. Render lee `render.yaml` y propone dos recursos: la app `anai-comunica` y la base de datos `anai-comunica-db`, ambos en la región Virginia (la más cercana a Ecuador).
3. Completa las variables que te pide:

| Variable | Qué poner |
| --- | --- |
| `SCHOOL_NAME` | El nombre oficial, p. ej. `Unidad Educativa Anai` |
| `ADMIN_EMAIL` | `direccion@anai.edu.ec` (o el correo de quien administra) |
| `ADMIN_PASSWORD` | Una contraseña temporal de al menos 8 caracteres |
| `ADMIN_NAME` | Nombre y apellido de esa persona |

4. Antes de aplicar, abre la base de datos y elige un **plan pago**: la base gratuita de Render vence a los pocos días. La app usa el plan `starter`, que no se suspende por inactividad. Revisa los precios vigentes en render.com/pricing.
5. Pulsa **Apply**. La primera compilación tarda unos minutos. Cuando termine, la app queda en una dirección temporal del tipo `https://anai-comunica.onrender.com`.

Mientras no conectes el dominio, los enlaces de los correos usan esa dirección temporal automáticamente, así que puedes probar todo sin tocar el DNS.

`JWT_SECRET` se genera solo y las claves de las notificaciones push también: el servidor las crea y las guarda en la base la primera vez que arranca.

## 3. Conectar el dominio comunica.anai.edu.ec

1. En Render, abre la app › **Settings › Custom Domains › Add** y escribe `comunica.anai.edu.ec`.
2. Render muestra un registro para el DNS. En la zona DNS de `anai.edu.ec` crea:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| CNAME | `comunica` | `anai-comunica.onrender.com` (el que indique Render) |

3. Espera a que Render marque el dominio como verificado; el certificado HTTPS se emite solo. HTTPS es obligatorio para las notificaciones push.
4. En la app › **Environment**, agrega la variable `APP_URL` con el valor `https://comunica.anai.edu.ec` y guarda. Quienes activaron notificaciones en la dirección temporal deberán activarlas de nuevo en la definitiva.

## 4. Primer ingreso de dirección

1. Entra a `https://comunica.anai.edu.ec` con `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
2. Abre **Tu cuenta** (tu nombre, abajo a la izquierda en computadora, o tus iniciales arriba a la derecha en el celular) › **Cambiar contraseña**.
3. En Render, borra la variable `ADMIN_PASSWORD`. Ya no se usa: la cuenta se crea solo cuando la base está vacía.

## 5. Cargar cursos, docentes y familias

Todo se hace en **Administración**, en este orden:

1. **Cursos**: crea cada curso con su grado y paralelo. Si vas a importar desde Excel, puedes saltar este paso: los cursos que falten se crean solos.
2. **Docentes y dirección**: crea la cuenta de cada docente con su correo institucional. Luego, en **Editar y asignar materias**, indica qué materia da en qué curso.
3. **Cursos** otra vez: asigna el tutor o tutora de cada curso.
4. **Importar desde Excel**: descarga la plantilla, llénala con una fila por cada representante de cada estudiante y súbela. El sistema revisa todas las filas y, si hay errores, te dice cuáles antes de guardar nada.
5. Revisa la lista en **Estudiantes y familias** y pulsa **Enviar invitaciones**.

Para la revisión, recomendamos empezar con **un curso piloto** y dos o tres docentes.

### Si el correo todavía no está configurado

Puedes revisar sin él. Cada persona tiene un botón **Enlace de acceso** que lo copia o lo envía por WhatsApp. El enlace es personal, sirve una sola vez y la invitación vence en 14 días.

## 6. Configurar el correo de avisos

Los correos saldrán a nombre de la institución, por ejemplo `Unidad Educativa Anai <notificaciones@avisos.anai.edu.ec>`, y llegan al correo personal que cada representante registró.

Elige una opción según lo que Anai ya usa.

### Opción A: Anai usa Google Workspace

1. En la consola de administración de Google: Aplicaciones › Google Workspace › Gmail › Enrutamiento › **Servicio de retransmisión SMTP**. Agrega una regla que permita autenticación SMTP y exija TLS.
2. Crea (o usa) la cuenta `notificaciones@anai.edu.ec` y genera para ella una **contraseña de aplicación**.
3. En Render, agrega estas variables en la app › **Environment**:

```
SMTP_HOST=smtp-relay.gmail.com
SMTP_PORT=587
SMTP_USER=notificaciones@anai.edu.ec
SMTP_PASS=(la contraseña de aplicación)
MAIL_FROM=Unidad Educativa Anai <notificaciones@anai.edu.ec>
```

El dominio de Google normalmente ya tiene SPF y DKIM; confírmalo en la consola (Gmail › Autenticar correo electrónico).

### Opción B: Amazon SES o Brevo

Usa un subdominio exclusivo para los avisos, así el correo institucional no se ve afectado:

1. En el proveedor, verifica el dominio `avisos.anai.edu.ec`.
2. El proveedor te dará registros DKIM (y en SES, un «MAIL FROM» personalizado). Agrégalos tal cual al DNS de `anai.edu.ec`.
3. Agrega también:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| TXT | `_dmarc.avisos` | `v=DMARC1; p=none; rua=mailto:sistemas@anai.edu.ec` |

4. Crea las credenciales SMTP en el proveedor y agrégalas en Render, en la app › **Environment** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`).

Amazon SES es el más económico por volumen, pero la cuenta nueva empieza en modo «sandbox» y hay que pedir la salida a producción. Brevo es más sencillo de configurar.

### Comprobar que funciona

En **Administración › Envíos** cada aviso aparece como *Enviado*, *Falló* (con el motivo) o *Simulado* (el correo aún no está configurado). Envía una invitación a tu propio correo y confirma que no cae en spam.

## 7. Notificaciones en los celulares

- **Android y computadora**: al entrar, la app ofrece «Activar notificaciones».
- **iPhone (iOS 16.4 o posterior)**: primero hay que instalar Anai Comunica. En Safari, botón Compartir › **Agregar a pantalla de inicio**, abrir Anai Comunica desde el ícono y activar las notificaciones. La app muestra estas instrucciones automáticamente.

Conviene incluir este paso en la comunicación de lanzamiento a las familias.

## Qué recibe cada familia por correo

| Aviso | Push | Correo |
| --- | --- | --- |
| Autorización o lectura pendiente, recordatorio de plazo | Sí | Siempre |
| Cita confirmada, rechazada o cancelada | Sí | Siempre |
| Comunicado informativo, mensaje nuevo | Sí | Solo si no activó el push |
| Novedad del colegio | Sí | Solo si eligió «Todo» |

El correo de un mensaje nunca incluye su contenido: solo avisa que hay un mensaje nuevo (LOPDP).

## Problemas frecuentes

- **«Aún no activas tu cuenta»**: la persona debe usar el enlace de invitación. Reenvíalo desde Administración con **Enlace de acceso**.
- **No llega el correo**: revisa Administración › Envíos. Si dice *Simulado*, falta el paso 6; si dice *Falló*, el motivo aparece debajo.
- **No aparecen notificaciones en iPhone**: Anai Comunica debe abrirse desde el ícono de la pantalla de inicio, no desde Safari.
- **Un docente también es representante**: necesita un correo distinto para cada rol.
- **La app no carga tras un cambio**: en Render, revisa la pestaña **Logs** de la app.

## Mantenimiento

- Render hace copias de seguridad de la base de datos en los planes pagos; revisa la retención de tu plan.
- Cada vez que se sube una versión nueva al repositorio, Render la compila y la publica sola.
- Para crear otra cuenta de dirección de emergencia desde la consola de Render (Shell): `npm run create-admin --prefix backend -- --email correo@anai.edu.ec --name "Nombre Apellido"`.
