"use server"

import {
  createMercadoPagoSubscription,
  cancelMercadoPagoSubscription,
  getMercadoPagoSubscription,
} from "@/lib/mercadopago"

export async function createSubscription(formData: FormData) {
  try {
    const userEmail = formData.get("userEmail") as string
    const userName = formData.get("userName") as string
    const monthlyAmount = Number.parseInt(formData.get("monthlyAmount") as string)
    const userId = formData.get("userId") as string

    if (!userEmail || !userName || !monthlyAmount || !userId) {
      return { error: "Datos faltantes para crear la suscripción" }
    }

    const subscription = await createMercadoPagoSubscription({
      userEmail,
      userName,
      monthlyAmount,
      userId,
    })

    return { success: true, subscription }
  } catch (error) {
    console.error("Error en createSubscription:", error)
    return { error: "Error al crear la suscripción" }
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const result = await cancelMercadoPagoSubscription(subscriptionId)
    return { success: true, result }
  } catch (error) {
    console.error("Error en cancelSubscription:", error)
    return { error: "Error al cancelar la suscripción" }
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await getMercadoPagoSubscription(subscriptionId)
    return { success: true, subscription }
  } catch (error) {
    console.error("Error en getSubscription:", error)
    return { error: "Error al obtener la suscripción" }
  }
}
