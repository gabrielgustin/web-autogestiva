"use server"

export async function getMercadoPagoPublicKey() {
  const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY

  if (!publicKey) {
    throw new Error("MercadoPago public key not configured")
  }

  return publicKey
}
