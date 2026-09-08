-- ============================================
-- SCRIPT DE CONFIGURACIÓN PARA NEON DATABASE
-- ============================================
-- Copia y pega este script completo en el SQL Editor de Neon
-- https://console.neon.tech/

-- 1. CREAR TABLAS
-- ============================================

-- Tabla de usuarios (admin y clientes)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de planes
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  billing_period VARCHAR(50) NOT NULL DEFAULT 'monthly',
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes (información adicional)
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de suscripciones
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES plans(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREAR ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_client_id ON subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id);

-- 3. INSERTAR DATOS INICIALES
-- ============================================

-- Usuario Admin
-- Email: autogestiva.info@gmail.com
-- Password: admin123
INSERT INTO users (email, password, role) VALUES 
('autogestiva.info@gmail.com', '$2a$10$YourHashedPasswordHere', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Usuario Cliente
-- Email: info@lifegym.com
-- Password: 123
INSERT INTO users (email, password, role) VALUES 
('info@lifegym.com', '$2a$10$YourHashedPasswordHere', 'client')
ON CONFLICT (email) DO NOTHING;

-- Crear registro de cliente para el usuario cliente
INSERT INTO clients (user_id, business_name, phone, city, country)
SELECT id, 'Life Gym', '+1234567890', 'Miami', 'USA'
FROM users WHERE email = 'info@lifegym.com'
ON CONFLICT DO NOTHING;

-- Planes de ejemplo
INSERT INTO plans (name, description, price, billing_period, features, is_active) VALUES
('Plan Básico', 'Ideal para emprendedores y pequeños negocios', 29.00, 'monthly', 
 '["Hasta 100 clientes", "Reportes básicos", "Soporte por email"]'::jsonb, true),
('Plan Profesional', 'Para negocios en crecimiento', 79.00, 'monthly',
 '["Hasta 500 clientes", "Reportes avanzados", "Soporte prioritario", "Integraciones"]'::jsonb, true),
('Plan Empresarial', 'Solución completa para grandes empresas', 199.00, 'monthly',
 '["Clientes ilimitados", "Reportes personalizados", "Soporte 24/7", "API completa", "Gestor dedicado"]'::jsonb, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- SCRIPT COMPLETADO
-- ============================================
-- Las tablas y datos iniciales han sido creados.
-- 
-- IMPORTANTE: Las contraseñas están hasheadas con bcrypt.
-- Necesitas actualizar los hashes de contraseña ejecutando
-- este script adicional después de crear las tablas.
