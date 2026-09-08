import { sql } from "@/lib/neon"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    console.log("[v0] Starting database setup...")

    // Test connection
    console.log("[v0] Testing database connection...")
    await sql`SELECT 1`
    console.log("[v0] Database connection successful!")

    // Create users table
    console.log("[v0] Creating users table...")
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create plans table
    console.log("[v0] Creating plans table...")
    await sql`
      CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        billing_period VARCHAR(50) NOT NULL,
        features JSONB,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create clients table
    console.log("[v0] Creating clients table...")
    await sql`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(255),
        phone VARCHAR(50),
        company VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create subscriptions table
    console.log("[v0] Creating subscriptions table...")
    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        plan_id INTEGER REFERENCES plans(id) ON DELETE SET NULL,
        status VARCHAR(50) DEFAULT 'active',
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create payments table
    console.log("[v0] Creating payments table...")
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(100),
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes
    console.log("[v0] Creating indexes...")
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_subscriptions_client_id ON subscriptions(client_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id)`

    // Check if admin user exists
    console.log("[v0] Checking for admin user...")
    const existingAdmin = await sql`
      SELECT id FROM users WHERE email = 'autogestiva.info@gmail.com'
    `

    if (existingAdmin.length === 0) {
      // Create admin user
      console.log("[v0] Creating admin user...")
      const hashedPassword = await bcrypt.hash("admin123", 10)
      const [adminUser] = await sql`
        INSERT INTO users (email, password, role)
        VALUES ('autogestiva.info@gmail.com', ${hashedPassword}, 'admin')
        RETURNING id
      `

      // Create admin client record
      await sql`
        INSERT INTO clients (user_id, full_name, status)
        VALUES (${adminUser.id}, 'Administrador', 'active')
      `
      console.log("[v0] Admin user created successfully!")
    } else {
      console.log("[v0] Admin user already exists")
    }

    // Check if client user exists
    console.log("[v0] Checking for client user...")
    const existingClient = await sql`
      SELECT id FROM users WHERE email = 'info@lifegym.com'
    `

    if (existingClient.length === 0) {
      console.log("[v0] Creating client user...")
      const clientHashedPassword = await bcrypt.hash("123", 10)
      const [clientUser] = await sql`
        INSERT INTO users (email, password, role)
        VALUES ('info@lifegym.com', ${clientHashedPassword}, 'client')
        RETURNING id
      `

      // Create client record
      await sql`
        INSERT INTO clients (user_id, full_name, company, status)
        VALUES (${clientUser.id}, 'Life Gym', 'Life Gym', 'active')
      `
      console.log("[v0] Client user created successfully!")
    } else {
      console.log("[v0] Client user already exists")
    }

    // Check if plans exist
    console.log("[v0] Checking for plans...")
    const existingPlans = await sql`SELECT COUNT(*) as count FROM plans`

    if (existingPlans[0].count === 0) {
      // Insert sample plans
      console.log("[v0] Creating sample plans...")
      await sql`
        INSERT INTO plans (name, description, price, billing_period, features)
        VALUES 
          ('Plan Básico', 'Ideal para empezar', 29.99, 'monthly', '["Feature 1", "Feature 2", "Feature 3"]'),
          ('Plan Profesional', 'Para negocios en crecimiento', 79.99, 'monthly', '["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]'),
          ('Plan Empresarial', 'Solución completa', 199.99, 'monthly', '["All Features", "Priority Support", "Custom Integration"]')
      `
      console.log("[v0] Sample plans created successfully!")
    } else {
      console.log("[v0] Plans already exist")
    }

    console.log("[v0] Database setup completed successfully!")

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully!",
      details: {
        tables: ["users", "plans", "clients", "subscriptions", "payments"],
        admin: {
          email: "autogestiva.info@gmail.com",
          password: "admin123",
        },
        client: {
          email: "info@lifegym.com",
          password: "123",
        },
      },
    })
  } catch (error: any) {
    console.error("[v0] Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
