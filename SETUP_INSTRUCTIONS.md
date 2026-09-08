# Instrucciones de Configuración - Autogestiva

## Sistema 100% Funcional

Este documento contiene los pasos finales para activar completamente el sistema de gestión de clientes de Autogestiva.

### Estado Actual
✅ Supabase conectado
✅ MercadoPago configurado
✅ Panel de administración creado
✅ Panel de clientes creado
✅ Landing page actualizada

### Pasos Finales (5 minutos)

#### 1. Ejecutar Scripts SQL en Supabase

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. Selecciona el proyecto "pipetlabor" (o el que conectaste)
3. En el menú lateral, haz clic en **SQL Editor**
4. Haz clic en **New query**
5. Copia y pega el contenido del archivo `scripts/EJECUTAR_TODO.sql`
6. Haz clic en **Run** (o presiona Ctrl+Enter)

Esto creará:
- Tabla de clientes
- Tabla de planes (Básico, Profesional, Premium)
- Tabla de pagos
- Cliente de ejemplo: lifegym

#### 2. Crear Usuario Administrador

**Opción A: Desde Supabase (Recomendado)**
1. En Supabase, ve a **Authentication** → **Users**
2. Haz clic en **Add user** → **Create new user**
3. Completa:
   - Email: `autogestiva.info@gmail.com`
   - Password: `123`
   - ✅ Marca "Auto Confirm User"
4. Haz clic en **Create user**

**Opción B: Desde la aplicación**
1. Ve a `/admin/setup`
2. Haz clic en "Crear Usuario Administrador"
3. Luego ve a Supabase → Authentication → Users
4. Busca el usuario y haz clic en "Confirm email"

#### 3. Probar el Sistema

1. **Login Administrador**
   - Ve a `/admin/login`
   - Email: `autogestiva.info@gmail.com`
   - Password: `123`

2. **Dashboard**
   - Verás estadísticas en tiempo real
   - Clientes activos, ingresos, pagos del mes

3. **Gestión de Clientes**
   - Ve a `/admin/clients` para ver todos los clientes
   - Haz clic en "Nuevo Cliente" para dar de alta
   - Asigna planes a cada cliente

4. **Pagos**
   - Ve a `/admin/payments` para ver el historial
   - Registra pagos mensuales

### Funcionalidades Disponibles

#### Panel de Administración (`/admin`)
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión completa de clientes
- ✅ Control de pagos mensuales
- ✅ Asignación de planes
- ✅ Historial de pagos
- ✅ Próximos pagos (día 10 de cada mes)

#### Panel de Clientes (`/client-panel`)
- ✅ Vista de información personal
- ✅ Plan actual y características
- ✅ Historial de pagos
- ✅ Próximo pago
- ✅ Responsive design (móvil y desktop)

#### Landing Page (`/`)
- ✅ Hero con CTA
- ✅ 4 Servicios: Landing Pages, E-commerce, Cartas Digitales, Catálogos Digitales
- ✅ Beneficios
- ✅ Testimonios
- ✅ FAQ
- ✅ Proceso
- ✅ Contacto por WhatsApp

### Integraciones Configuradas

#### Supabase
- Base de datos PostgreSQL
- Autenticación de usuarios
- Row Level Security (RLS)

#### MercadoPago
- Public Key: APP_USR-724e6357-030b-495b-a9c0-2eb3ce430d9c
- Access Token: Configurado
- Webhook Secret: Configurado

### Estructura de la Base de Datos

#### Tabla: clients
- id, name, email, phone, business_name
- plan_id (relación con planes)
- status (active/inactive/suspended)
- join_date, next_payment_date

#### Tabla: plans
- id, name, price, billing_cycle
- features (JSON con características)

#### Tabla: payments
- id, client_id, amount, payment_date
- status (pending/completed/failed)
- payment_method

### Próximos Pasos Recomendados

1. **Configurar Webhooks de MercadoPago**
   - URL: `https://tu-dominio.com/api/webhooks/mercadopago`
   - Secret: `autogestiva_webhook_secret_2024_a7f3e9d2c1b8`

2. **Desplegar en Vercel**
   - Conecta el repositorio de GitHub
   - Configura las variables de entorno
   - Despliega automáticamente

3. **Personalizar**
   - Ajusta los planes según tus necesidades
   - Personaliza los emails de notificación
   - Agrega más funcionalidades según requieras

### Soporte

Si tienes problemas:
1. Verifica que las tablas se crearon correctamente en Supabase
2. Confirma que el usuario administrador está creado y confirmado
3. Revisa los logs de la consola del navegador para errores
4. Verifica que todas las variables de entorno estén configuradas

---

**¡Tu sistema está listo para usar!** 🚀
