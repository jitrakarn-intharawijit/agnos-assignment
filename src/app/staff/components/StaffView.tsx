"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function StaffView() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    socket.on("patient-update", (data) => {
      setData(data);
    });

    return () => {
      socket.off("patient-update");
    };
  }, []);

  const Field = ({ label, value, className = "" }: any) => (
    <div className={className}>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 break-words whitespace-pre-wrap">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Patient Live Preview
        </h2>
        <p className="text-sm text-gray-400">
          Data updates in real-time while patient is typing
        </p>
      </div>

      {/* Personal Info */}
      <div>
        <h3 className="text-sm font-semibold text-blue-600 mb-3">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="First Name" value={data.firstName} />
          <Field label="Middle Name" value={data.middleName} />
          <Field label="Last Name" value={data.lastName} />
          <Field label="Date of Birth" value={data.dateOfBirth} />
          <Field label="Gender" value={data.gender} />
          <Field label="Nationality" value={data.nationality} />
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-sm font-semibold text-blue-600 mb-3">
          Contact Information
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Phone" value={data.phone} />
          <Field label="Email" value={data.email} />
          <Field label="Preferred Language" value={data.preferredLanguage} />
          <Field label="Religion" value={data.religion} />
        </div>

        <div className="mt-4">
          <Field
            label="Address"
            value={data.address}
            className="col-span-2 md:col-span-3"
          />
        </div>
      </div>

      {/* Emergency */}
      <div>
        <h3 className="text-sm font-semibold text-blue-600 mb-3">
          Emergency Contact
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Contact Name" value={data.emergencyName} />
          <Field label="Relationship" value={data.emergencyRelationship} />
        </div>
      </div>
    </div>
  );
}
