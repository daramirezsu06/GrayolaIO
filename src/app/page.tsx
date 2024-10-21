const HomePage = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-center py-20">
          <h1 className="text-4xl font-bold">
            Diseño a tu alcance, a gran escala
          </h1>
          <p className="mt-4 text-lg">
            Simplificamos la gestión de proyectos de diseño para empresas de
            todo el mundo.
          </p>
          <div className="mt-8">
            <a
              href="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 mr-4">
              Crear Cuenta
            </a>
            <a
              href="/contact"
              className="bg-transparent border border-white px-6 py-3 rounded-md text-white font-semibold hover:bg-white hover:text-blue-600">
              Contactar
            </a>
          </div>
        </section>

        {/* Servicios Section */}
        <section className="py-20 bg-white text-center">
          <h2 className="text-3xl font-bold text-gray-800">¿Qué hacemos?</h2>
          <p className="mt-4 text-gray-600">
            Ofrecemos servicios de diseño gráfico, edición de video y diseño
            UX/UI, facilitando la colaboración en proyectos a gran escala.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-700">
                Diseño Gráfico
              </h3>
              <p className="mt-4 text-gray-600">
                Desde logos hasta material promocional, nuestros diseñadores
                están listos para crear lo que necesitas.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-700">
                Edición de Video
              </h3>
              <p className="mt-4 text-gray-600">
                Transforma tus ideas en contenido visual de alto impacto con
                nuestros servicios de edición profesional.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-700">
                Diseño UX/UI
              </h3>
              <p className="mt-4 text-gray-600">
                Optimiza la experiencia de usuario de tu web o app con nuestros
                expertos en diseño digital.
              </p>
            </div>
          </div>
        </section>

        {/* Beneficios Section */}
        <section className="py-20 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            ¿Por qué Grayola.io?
          </h2>
          <p className="mt-4 text-gray-600">
            Gestiona tus proyectos de diseño de forma eficiente con nuestra
            plataforma escalable y colaborativa.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Escalabilidad
              </h3>
              <p className="mt-2 text-gray-600">
                Gestiona cientos de proyectos de diseño a la vez.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Colaboración en Tiempo Real
              </h3>
              <p className="mt-2 text-gray-600">
                Trabaja de manera colaborativa entre project managers y
                diseñadores.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Soporte Personalizado
              </h3>
              <p className="mt-2 text-gray-600">
                Soporte disponible para ayudarte en cada paso del camino.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center">
          <h2 className="text-3xl font-bold">Empieza hoy con Grayola.io</h2>
        </section>
      </div>
    </>
  );
};
export default HomePage;
