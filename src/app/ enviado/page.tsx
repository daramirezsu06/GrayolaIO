const SignupSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Registro exitoso!
        </h1>
        <p className="text-gray-600 mb-4">
          Te hemos enviado un correo electrónico para que procedas con el inicio
          de sesión. Por favor, revisa tu bandeja de entrada y la carpeta de
          spam
        </p>
        <p className="text-gray-600 mb-6">
          Si no recibiste el correo,
          <span className="font-semibold">intenta nuevamente más tarde.</span>
        </p>
      </div>
    </div>
  );
};
export default SignupSuccessPage;
