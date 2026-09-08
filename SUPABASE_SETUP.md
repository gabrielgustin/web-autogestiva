# Configuración de Supabase

Este proyecto usa Supabase como base de datos. Sigue estos pasos para configurar tu base de datos:

## Paso 1: Acceder al SQL Editor de Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. En el menú lateral, haz click en "SQL Editor"

## Paso 2: Ejecutar los scripts SQL

Ejecuta los siguientes scripts **en orden**:

### Script 1: Crear tablas (001_create_tables.sql)

Copia y pega el contenido del archivo `scripts/001_create_tables.sql` en el SQL Editor y haz click en "Run".

Este script crea:
- Tabla `profiles` (perfiles de usuario con roles)
- Tabla `plans` (planes de suscripción)
- Tabla `clients` (información de clientes)
- Tabla `payments` (historial de pagos)
- Políticas de seguridad RLS (Row Level Security)

### Script 2: Crear trigger de perfiles (002_create_profile_trigger.sql)

Copia y pega el contenido del archivo `scripts/002_create_profile_trigger.sql` en el SQL Editor y haz click en "Run".

Este script crea un trigger que automáticamente:
- Crea un perfil cuando un usuario se registra
- Crea un registro de cliente si el rol es "client"

### Script 3: Datos iniciales (003_seed_data.sql)

Copia y pega el contenido del archivo `scripts/003_seed_data.sql` en el SQL Editor y haz click en "Run".

Este script inserta:
- 3 planes de ejemplo (Básico, Profesional, Empresarial)

## Paso 3: Verificar la instalación

Después de ejecutar los scripts, verifica que las tablas se crearon correctamente:

1. En el menú lateral de Supabase, haz click en "Table Editor"
2. Deberías ver las siguientes tablas:
   - `profiles`
   - `plans`
   - `clients`
   - `payments`

## Paso 4: Crear usuario administrador

Para crear tu primer usuario administrador:

1. Ve a "Authentication" > "Users" en Supabase
2. Haz click en "Add user" > "Create new user"
3. Ingresa:
   - Email: tu email (ej: autogestiva.info@gmail.com)
   - Password: tu contraseña
   - User Metadata (JSON):
     \`\`\`json
     {
       "role": "admin",
       "full_name": "Tu Nombre"
     }
     \`\`\`
4. Haz click en "Create user"

El trigger automáticamente creará el perfil con rol "admin".

## Notas importantes

- **Row Level Security (RLS)**: Todas las tablas tienen RLS habilitado para seguridad
- **Roles**: Hay dos roles: `admin` (administrador) y `client` (cliente)
- **Permisos**:
  - Admins pueden ver y modificar todo
  - Clients solo pueden ver sus propios datos

## Solución de problemas

Si los scripts fallan:

1. Verifica que estés usando Supabase Pro (necesario para algunas funciones)
2. Asegúrate de ejecutar los scripts en orden
3. Si un script ya se ejecutó, puedes volver a ejecutarlo (usa `IF NOT EXISTS` y `ON CONFLICT`)
4. Revisa los errores en el SQL Editor para más detalles
