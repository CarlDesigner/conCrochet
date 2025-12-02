

export default function Footer() {

    return(
            <div className="border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Con Crochet. Todos los izquierdos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Política de Privacidad</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Términos de Servicio</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Devoluciones</a>
          </div>
        </div>
      </div>
    </div>
    )
}