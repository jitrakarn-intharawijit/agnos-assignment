export type PatientFormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  religion?: string;
  emergencyName?: string;
  emergencyRelationship?: string;
};

export const InitailPatientFormData: PatientFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  religion: "",
  emergencyName: "",
  emergencyRelationship: "",
};

export type FieldConfig = {
  name: keyof PatientFormData;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  colSpan?: number;
  maxLength?: number;
};
