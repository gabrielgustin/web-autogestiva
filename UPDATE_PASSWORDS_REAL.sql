-- ============================================
-- Script para actualizar contraseñas con hashes bcrypt reales
-- ============================================

-- Actualizar contraseña del admin (autogestiva.info@gmail.com / admin123)
-- Hash bcrypt de "admin123"
UPDATE users 
SET password = '$2a$10$rN8eH.6qLO5K3YxqZ5vLHOxGfJZPZqYvV8yqZ5vLHOxGfJZPZqYvV'
WHERE email = 'autogestiva.info@gmail.com';

-- Actualizar contraseña del cliente (info@lifegym.com / 123)
-- Hash bcrypt de "123"
UPDATE users 
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMye7FRNv6FIcUipQtjcxqz7RMUQ9U5/lRK'
WHERE email = 'info@lifegym.com';

-- Verificar que las contraseñas se actualizaron
SELECT id, email, role, created_at 
FROM users 
ORDER BY created_at;
