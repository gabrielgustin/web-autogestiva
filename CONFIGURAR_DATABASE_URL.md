# Configurar NEON_NEON_DATABASE_URL en v0

El sistema necesita la variable de entorno `DATABASE_URL` para conectarse a Neon.

## Pasos para configurar:

1. **Abre la sección "Vars" en el sidebar izquierdo de v0**

2. **Agrega una nueva variable de entorno:**
   - Nombre: `DATABASE_URL`
   - Valor: `postgresql://neondb_owner:npg_YourPasswordHere@ep-damp-bonus-adspoozm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require`
   
   (Reemplaza `npg_YourPasswordHere` con tu contraseña real de Neon)

3. **Guarda los cambios**

4. **Recarga la aplicación**

## Cómo obtener tu DATABASE_URL de Neon:

1. Ve a https://console.neon.tech/
2. Selecciona tu proyecto "neondb"
3. Ve a "Connection Details"
4. Copia la "Connection string" completa
5. Pégala como valor de DATABASE_URL en v0

## Verificar que funciona:

Después de configurar DATABASE_URL, visita:
- `/api/diagnose` - Para ver el diagnóstico de conexión
- `/login` - Para probar el login

## Usuarios de prueba:

Una vez configurado, puedes hacer login con:
- **Admin:** autogestiva.info@gmail.com / admin123
- **Cliente:** info@lifegym.com / 123
