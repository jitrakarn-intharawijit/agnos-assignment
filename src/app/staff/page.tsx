import StaffView from "@/app/staff/components/StaffView";

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Staff Dashboard
        </h1>

        <StaffView />
      </div>
    </div>
  );
}
