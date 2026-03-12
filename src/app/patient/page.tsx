import PatientForm from "@/app/patient/components/PatientForm";

export default function PatientPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Patient Registration
        </h1>

        <PatientForm />
      </div>
    </div>
  );
}
