const Footer = () => {
  return (
    <footer className="bg-[#04112b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo y descripción de la pagina-app */} 
        <div>
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            SportConnect
          </h2>
          <p className="text-gray-400">
            Reservá canchas deportivas de forma rápida y sencilla.
          </p>
        </div>

        {/* Enlaces (inicio- iniciar session) */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Enlaces</h3>
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Inicio
            </a>
            <a
              href="/login"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Iniciar sesión
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contacto</h3>
          <p className="text-gray-400">contacto@sportrent.com</p>
          <p className="text-gray-400 mt-2">+54 11 1234-5678</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
