import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-100 to-gray-100 flex justify-center">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-950 mb-6">Crear Cuenta</h2>

        <p className="text-gray-700 mb-8">
          Regístrate y comienza tu camino hacia una rutina más profesional y
          motivadora.
        </p>

        <RegisterForm />

        <p className="text-gray-500 mt-4 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-950 font-medium hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
