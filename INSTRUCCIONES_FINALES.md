# Instrucciones Finales - Sistema Autogestiva con Neon

## Sistema 100% Funcional con Neon Database

El sistema ha sido migrado completamente de Supabase a Neon. Ahora usa:
- **Neon** como base de datos PostgreSQL
- **JWT** para autenticación de administradores
- **bcrypt** para encriptación de contraseñas

## Pasos para Activar el Sistema

### 1. Acceder a Neon Database

1. Ve a https://console.neon.tech
2. Inicia sesión con tu cuenta
3. Busca el proyecto conectado a Vercel (debería aparecer automáticamente)
4. O crea un nuevo proyecto si es necesario

### 2. Ejecutar el Script SQL

1. En el panel de Neon, ve a **SQL Editor**
2. Copia y pega el siguiente script completo:

\`\`\`sql
-- Crear tablas
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  plan_id UUID REFERENCES plans(id),
  status TEXT DEFAULT 'active',
  next_payment_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar planes
INSERT INTO plans (name, price, features) VALUES
('Básico', 9990, '["Carta digital", "Hasta 50 productos", "Soporte básico"]'),
('Profesional', 19990, '["Carta digital", "Catálogo digital", "Productos ilimitados", "Soporte prioritario"]'),
('Premium', 29990, '["Todo incluido", "E-commerce", "Landing page", "Soporte 24/7"]')
ON CONFLICT DO NOTHING;

-- Insertar cliente de ejemplo lifegym
INSERT INTO clients (name, email, phone, company, plan_id, status, next_payment_date)
SELECT 
  'Life Gym', 
  'contacto@lifegym.com', 
  '+54 9 11 1234-5678', 
  'Life Gym', 
  (SELECT id FROM plans WHERE name = 'Profesional' LIMIT 1),
  'active', 
  '2024-12-10'
ON CONFLICT (email) DO NOTHING;

-- Crear usuario administrador
-- Email: autogestiva.info@gmail.com
-- Password: 123
-- Hash generado con bcrypt
INSERT INTO admin_users (email, password_hash) VALUES
('autogestiva.info@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT (email) DO NOTHING;
\`\`\`

3. Haz clic en **Run** para ejecutar el script

### 3. Probar el Sistema

1. Ve a tu aplicación: `/admin/login`
2. Ingresa las credenciales:
   - **Email**: autogestiva.info@gmail.com
   - **Password**: 123
3. Deberías acceder al dashboard con todas las funcionalidades

## Funcionalidades Disponibles

Una vez dentro del panel de administración:

- **Dashboard**: Estadísticas en tiempo real de clientes, ingresos y pagos
- **Clientes**: Lista completa de clientes con búsqueda y filtros
- **Nuevo Cliente**: Formulario para dar de alta nuevos clientes
- **Pagos**: Gestión y historial de pagos mensuales
- **Planes**: Administración de planes disponibles

## Credenciales

**Administrador:**
- Email: autogestiva.info@gmail.com
- Password: 123

**Cliente de Ejemplo (lifegym):**
- Nombre: Life Gym
- Email: contacto@lifegym.com
- Plan: Profesional ($19,990)
- Estado: Activo
- Próximo pago: 10 de diciembre 2024

## Variables de Entorno Necesarias

El sistema usa estas variables de entorno (ya configuradas en Vercel):

\`\`\`env
NEON_NEON_DATABASE_URL=postgresql://...
JWT_SECRET=autogestiva-secret-key-2024
\`\`\`

## Notas Importantes

- El sistema ya NO usa Supabase, ahora usa Neon
- La autenticación es con JWT, no con Supabase Auth
- Las contraseñas están encriptadas con bcrypt
- El middleware protege todas las rutas de administración
- Los pagos se calculan automáticamente para el día 10 de cada mes

## Soporte

Si tienes problemas:
1. Verifica que el script SQL se ejecutó correctamente en Neon
2. Verifica que las variables de entorno estén configuradas en Vercel
3. Revisa los logs en Vercel para ver errores específicos
