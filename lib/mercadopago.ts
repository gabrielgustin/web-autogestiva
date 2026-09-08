export interface SubscriptionData {
  userEmail: string
  userName: string
  monthlyAmount: number
  userId: string
}

export async function createMercadoPagoSubscription(data: SubscriptionData) {
  try {
    const backUrl = "https://landing-autogestiva.vercel.app/client-panel/payment-methods?status=success"

    console.log("[v0] Creating MP subscription with back_url:", backUrl)

    const body = {
      reason: `Suscripción mensual - ${data.userName}`,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: data.monthlyAmount,
        currency_id: "ARS",
      },
      payer_email: data.userEmail,
      back_url: backUrl,
      status: "pending",
    }

    console.log("[v0] MP subscription body:", JSON.stringify(body, null, 2))

    const response = await fetch("https://api.mercadopago.com/preapproval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] MP API error:", errorData)
      throw new Error(errorData.message || "Error en la API de Mercado Pago")
    }

    const subscription = await response.json()

    console.log("[v0] MP subscription created successfully:", JSON.stringify(subscription, null, 2))

    return subscription
  } catch (error: any) {
    console.error("[v0] Error creating MercadoPago subscription:", error)
    throw new Error(error?.message || "Error al crear la suscripción en Mercado Pago")
  }
}

export async function cancelMercadoPagoSubscription(subscriptionId: string) {
  try {
    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ status: "cancelled" }),
    })

    if (!response.ok) {
      throw new Error("Error al cancelar la suscripción")
    }

    return await response.json()
  } catch (error) {
    console.error("Error cancelling MercadoPago subscription:", error)
    throw error
  }
}

export async function getMercadoPagoSubscription(subscriptionId: string) {
  try {
    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Error al obtener la suscripción")
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting MercadoPago subscription:", error)
    throw error
  }
}
