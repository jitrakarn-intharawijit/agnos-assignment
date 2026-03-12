"use client";

import { useForm, useWatch } from "react-hook-form";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import { FieldConfig, InitailPatientFormData, PatientFormData } from "./type";

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    defaultValues: InitailPatientFormData,
    mode: "onChange",
  });

  const data = useWatch({ control });

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("patient-update", data);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (formData: PatientFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    socket.emit("patient-submitted", formData);
    setSubmitted(true);
  };

  const formSections: { title: string; fields: FieldConfig[] }[] = [
    {
      title: "Personal Information",
      fields: [
        { name: "firstName", label: "First Name", required: true },
        { name: "middleName", label: "Middle Name" },
        { name: "lastName", label: "Last Name", required: true },
        {
          name: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          required: true,
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female"],
        },
        { name: "nationality", label: "Nationality" },
      ],
    },
    {
      title: "Contact Information",
      fields: [
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "preferredLanguage", label: "Preferred Language" },
        { name: "religion", label: "Religion" },
        {
          name: "address",
          label: "Address",
          type: "textarea",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Emergency Contact",
      fields: [
        { name: "emergencyName", label: "Contact Name" },
        { name: "emergencyRelationship", label: "Relationship" },
      ],
    },
  ] satisfies { title: string; fields: FieldConfig[] }[];

  const renderField = (field: FieldConfig) => {
    if (field.type === "select") {
      return (
        <select
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          className={`input ${errors[field.name] ? "border-red-500" : ""}`}
        >
          <option value="">Select {field.label}</option>

          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          className={`input min-h-[100px] ${
            errors[field.name] ? "border-red-500" : ""
          }`}
          maxLength={field.maxLength ?? 2000}
        />
      );
    }

    return (
      <input
        type={field.type ?? "text"}
        {...register(field.name, {
          required: field.required ? `${field.label} is required` : false,

          ...(field.name === "email" && {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          }),

          ...(field.name === "phone" && {
            pattern: {
              value: /^[0-9\-]+$/,
              message: "Invalid phone number",
            },
            onChange: (e) =>
              (e.target.value = e.target.value.replace(/[^0-9-]/g, "")),
          }),
        })}
        className={`input ${errors[field.name] ? "border-red-500" : ""}`}
        maxLength={field.maxLength ?? 100}
      />
    );
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {formSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            {section.title}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {section.fields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                required={field.required ?? false}
                className={field.colSpan === 2 ? "md:col-span-2" : ""}
              >
                {renderField(field)}

                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </FormField>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
      >
        {isSubmitting && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}

        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {submitted && (
        <p className="text-green-600 text-sm">Form submitted successfully</p>
      )}
    </form>
  );
}
