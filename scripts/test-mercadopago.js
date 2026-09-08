const { MercadoPagoConfig, PreApproval } = require("mercadopago")

// Configuración de MercadoPago para testing
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
})

const preapproval = new PreApproval(client)

async function testMercadoPagoConnection() {
  console.log("🧪 Probando conexión con MercadoPago...")

  try {
    // Verificar credenciales
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("❌ MERCADOPAGO_ACCESS_TOKEN no está configurado")
    }

    if (!process.env.MERCADOPAGO_PUBLIC_KEY) {
      throw new Error("❌ MERCADOPAGO_PUBLIC_KEY no está configurado")
    }

    console.log("✅ Variables de entorno configuradas")
    console.log("✅ Access Token:", process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 20) + "...")
    console.log("✅ Public Key:", process.env.MERCADOPAGO_PUBLIC_KEY.substring(0, 20) + "...")

    // Probar creación de suscripción de prueba
    const testSubscription = {
      reason: "Test Subscription - MercadoPago Integration",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 100,
        currency_id: "ARS",
      },
      payer_email: "test@example.com",
      back_url: "http://localhost:3000/success",
      status: "pending",
    }

    console.log("🔄 Creando suscripción de prueba...")
    const result = await preapproval.create({ body: testSubscription })

    console.log("✅ Suscripción creada exitosamente:")
    console.log("   - ID:", result.id)
    console.log("   - Estado:", result.status)
    console.log("   - Monto:", result.auto_recurring.transaction_amount)
    console.log("   - URL de pago:", result.init_point)

    // Limpiar - cancelar la suscripción de prueba
    console.log("🧹 Limpiando suscripción de prueba...")
    await preapproval.update({
      id: result.id,
      body: { status: "cancelled" },
    })

    console.log("✅ Test completado exitosamente")
  } catch (error) {
    console.error("❌ Error en test de MercadoPago:")
    console.error("   Mensaje:", error.message)
    console.error("   Detalles:", error.cause || "No hay detalles adicionales")

    if (error.status) {
      console.error("   Status HTTP:", error.status)
    }

    process.exit(1)
  }
}

// Ejecutar test si se llama directamente
if (require.main === module) {
  testMercadoPagoConnection()
}

module.exports = { testMercadoPagoConnection }
