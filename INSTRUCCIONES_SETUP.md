# Instrucciones para Configurar la Base de Datos Neon

## Paso 1: Acceder al SQL Editor de Neon

1. Ve a https://console.neon.tech/
2. Inicia sesión en tu cuenta
3. Selecciona tu proyecto "neondb"
4. Haz click en "SQL Editor" en el menú lateral

## Paso 2: Ejecutar el Script de Setup

1. Abre el archivo `SETUP_NEON.sql`
2. Copia TODO el contenido del archivo
3. Pégalo en el SQL Editor de Neon
4. Haz click en "Run" o presiona Ctrl+Enter

Esto creará:
- ✅ Tabla `users` (usuarios admin y clientes)
- ✅ Tabla `plans` (planes de suscripción)
- ✅ Tabla `clients` (información de clientes)
- ✅ Tabla `subscriptions` (suscripciones activas)
- ✅ Tabla `payments` (historial de pagos)
- ✅ Índices para mejor rendimiento
- ✅ Datos iniciales (usuarios y planes)

## Paso 3: Actualizar Contraseñas

**IMPORTANTE:** El script inicial usa hashes de ejemplo. Necesitas actualizar las contraseñas:

### Opción A: Usar la API de Setup (Recomendado)

1. Una vez que las tablas estén creadas, visita: `http://localhost:3000/api/setup-database`
2. Esto actualizará las contraseñas con hashes bcrypt reales

### Opción B: Actualizar manualmente

1. Abre el archivo `UPDATE_PASSWORDS.sql`
2. Copia el contenido
3. Pégalo en el SQL Editor de Neon
4. Haz click en "Run"

## Paso 4: Verificar la Instalación

Ejecuta esta consulta en el SQL Editor para verificar:

\`\`\`sql
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM plans) as total_plans,
  (SELECT COUNT(*) FROM clients) as total_clients;
\`\`\`

Deberías ver:
- 2 usuarios (admin + cliente)
- 3 planes
- 1 cliente

## Credenciales de Acceso

### Usuario Admin
- Email: `autogestiva.info@gmail.com`
- Password: `admin123`

### Usuario Cliente
- Email: `info@lifegym.com`
- Password: `123`

## Solución de Problemas

### Error: "relation already exists"
- Las tablas ya existen. Puedes ignorar este error o eliminar las tablas primero con:
  \`\`\`sql
  DROP TABLE IF EXISTS payments, subscriptions, clients, plans, users CASCADE;
  \`\`\`

### Error: "permission denied"
- Asegúrate de estar conectado con el usuario correcto en Neon
- Verifica que tienes permisos de escritura en la base de datos

### Las contraseñas no funcionan
- Ejecuta el script `UPDATE_PASSWORDS.sql`
- O visita `/api/setup-database` para actualizar las contraseñas automáticamente

## Siguiente Paso

Una vez completado el setup, puedes:
1. Ir a `/login` e iniciar sesión con las credenciales del admin
2. Acceder al dashboard en `/admin/dashboard`
3. Gestionar clientes, planes y suscripciones
