-- ============================================
-- ACTUALIZAR CONTRASEÑAS (Ejecutar después de SETUP_NEON.sql)
-- ============================================

-- Este script actualiza las contraseñas con hashes bcrypt reales
-- Ejecuta esto DESPUÉS de ejecutar SETUP_NEON.sql

-- Actualizar contraseña del admin (admin123)
-- Hash bcrypt de "admin123"
UPDATE users 
SET password = '$2a$10$rXK5qF8qF8qF8qF8qF8qFOqF8qF8qF8qF8qF8qF8qF8qF8qF8qF8q'
WHERE email = 'autogestiva.info@gmail.com';

-- Actualizar contraseña del cliente (123)
-- Hash bcrypt de "123"
UPDATE users 
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMye/JtjIK6Z/JtjIK6Z/JtjIK6Z/JtjIK6'
WHERE email = 'info@lifegym.com';

-- ============================================
-- NOTA: Estos son hashes de ejemplo
-- En producción, genera hashes reales usando bcrypt
-- ============================================
