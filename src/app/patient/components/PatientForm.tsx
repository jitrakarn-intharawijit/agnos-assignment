"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import { FieldConfig, InitailPatientFormData, PatientFormData } from "./type";
import { socket } from "../../../lib/socket";

export default function PatientForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    defaultValues: InitailPatientFormData,
    mode: "onChange",
  });

  const data = useWatch({ control });

  // ####################### Submit #######################
  const onSubmit = async (formData: PatientFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    socket.emit("patient-update", formData);
    socket.emit("patient-status", "submitted");

    setSubmitted(true);
  };

  useEffect(() => {
    if (!data) return;

    socket.emit("patient-status", "typing");

    const updateTimer = setTimeout(() => {
      socket.emit("patient-update", data);
    }, 300);

    const idleTimer = setTimeout(() => {
      socket.emit("patient-status", "idle");
    }, 10000);

    return () => {
      clearTimeout(updateTimer);
      clearTimeout(idleTimer);
    };
  }, [data]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  // ####################### Field #######################
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

  const renderField = (config: FieldConfig) => {
    return (
      <Controller
        name={config.name}
        control={control}
        rules={{
          required: config.required ? `${config.label} is required` : false,

          ...(config.name === "email" && {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          }),

          ...(config.name === "phone" && {
            pattern: {
              value: /^[0-9\-]+$/,
              message: "Invalid phone number",
            },
          }),
        }}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;

          return (
            <>
              {config.type === "select" && (
                <select
                  {...field}
                  className={`input ${hasError ? "!border-red-500" : ""}`}
                >
                  <option value="">Select {config.label}</option>

                  {config.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {config.type === "textarea" && (
                <textarea
                  {...field}
                  className={`input min-h-[100px] ${hasError ? "!border-red-500" : ""}`}
                  maxLength={config.maxLength ?? 2000}
                />
              )}

              {(!config.type ||
                config.type === "text" ||
                config.type === "email" ||
                config.type === "tel" ||
                config.type === "date") && (
                <input
                  type={config.type ?? "text"}
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (config.name === "phone") {
                      value = value.replace(/[^0-9-]/g, "");
                    }

                    field.onChange(value);
                  }}
                  className={`input ${hasError ? "!border-red-500" : ""}`}
                  maxLength={config.maxLength ?? 100}
                />
              )}

              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
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

          <div className="grid grid-cols-2 gap-4">
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
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-bold"
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
