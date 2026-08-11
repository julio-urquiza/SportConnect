import crypto from "crypto"

/**
 * Utilitario de cifrado simétrico (AES-256-GCM) para tokens sensibles
 * (access_token / refresh_token de Mercado Pago).
 *
 * La clave se lee de la variable de entorno MP_TOKEN_ENCRYPTION_KEY,
 * que debe ser una cadena hexadecimal de 64 caracteres (32 bytes).
 *
 * Para generar una clave nueva:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

const ALGORITHM = "aes-256-gcm"
const IV_LENGTH = 12 // recomendado para GCM
const AUTH_TAG_LENGTH = 16

/**
 * Obtiene la clave de cifrado desde el entorno y la valida.
 * @returns {Buffer} Clave de 32 bytes
 * @throws {Error} Si la variable de entorno falta o tiene formato inválido
 */
function getEncryptionKey() {
  const rawKey = process.env.MP_TOKEN_ENCRYPTION_KEY

  if (!rawKey) {
    throw new Error(
      "MP_TOKEN_ENCRYPTION_KEY no está definida en las variables de entorno"
    )
  }

  const key = Buffer.from(rawKey, "hex")

  if (key.length !== 32) {
    throw new Error(
      "MP_TOKEN_ENCRYPTION_KEY debe ser una cadena hexadecimal de 64 caracteres (32 bytes)"
    )
  }

  return key
}

/**
 * Cifra un texto plano.
 * @param {string} plainText - Texto a cifrar (ej. un access_token)
 * @returns {string} Cadena en formato "iv:authTag:cipherText" (todo en hex)
 */
export function encrypt(plainText) {
  if (typeof plainText !== "string" || plainText.length === 0) {
    throw new Error("encrypt() requiere un string no vacío")
  }

  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final()
  ])

  const authTag = cipher.getAuthTag()

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex")
  ].join(":")
}

/**
 * Descifra una cadena generada por encrypt().
 * @param {string} cipherPayload - Cadena "iv:authTag:cipherText"
 * @returns {string} Texto plano original
 */
export function decrypt(cipherPayload) {
  if (typeof cipherPayload !== "string" || !cipherPayload.includes(":")) {
    throw new Error("decrypt() recibió un payload con formato inválido")
  }

  const [ivHex, authTagHex, encryptedHex] = cipherPayload.split(":")

  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error("decrypt() recibió un payload incompleto")
  }

  const key = getEncryptionKey()
  const iv = Buffer.from(ivHex, "hex")
  const authTag = Buffer.from(authTagHex, "hex")
  const encrypted = Buffer.from(encryptedHex, "hex")

  if (authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error("decrypt() recibió un authTag con longitud inválida")
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ])

  return decrypted.toString("utf8")
}