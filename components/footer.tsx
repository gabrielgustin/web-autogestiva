const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</div>
        <div className="flex space-x-4">
          <a href="/terminos-y-condiciones" className="hover:text-gray-300">
            Términos y Condiciones
          </a>
          <a href="/politica-de-privacidad" className="hover:text-gray-300">
            Política de Privacidad
          </a>
          <a href="/contacto" className="hover:text-gray-300">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
