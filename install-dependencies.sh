#!/bin/bash

echo "🚀 Instalando dependencias para TuPedido1..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Instalar dependencias
echo "📦 Instalando dependencias de Node.js..."
npm install

# Verificar si la instalación fue exitosa
if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Verificar dependencias críticas
echo "🔍 Verificando dependencias críticas..."

# Verificar MercadoPago
if npm list mercadopago &> /dev/null; then
    echo "✅ MercadoPago SDK instalado"
else
    echo "❌ MercadoPago SDK no encontrado"
    exit 1
fi

# Verificar Next.js
if npm list next &> /dev/null; then
    echo "✅ Next.js instalado"
else
    echo "❌ Next.js no encontrado"
    exit 1
fi

# Verificar React
if npm list react &> /dev/null; then
    echo "✅ React instalado"
else
    echo "❌ React no encontrado"
    exit 1
fi

# Verificar Tailwind CSS
if npm list tailwindcss &> /dev/null; then
    echo "✅ Tailwind CSS instalado"
else
    echo "❌ Tailwind CSS no encontrado"
    exit 1
fi

# Verificar Framer Motion
if npm list framer-motion &> /dev/null; then
    echo "✅ Framer Motion instalado"
else
    echo "❌ Framer Motion no encontrado"
    exit 1
fi

echo ""
echo "🎉 ¡Instalación completada exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura tus variables de entorno en .env.local"
echo "2. Ejecuta 'npm run test:mp' para probar MercadoPago"
echo "3. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
echo ""
echo "🔧 Comandos útiles:"
echo "   npm run dev     - Iniciar servidor de desarrollo"
echo "   npm run build   - Construir para producción"
echo "   npm run start   - Iniciar servidor de producción"
echo "   npm run test:mp - Probar configuración de MercadoPago"
echo ""
