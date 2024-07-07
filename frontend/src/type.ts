export enum FieldType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  CHOICE = "choice",
  MULTI_CHOICE = "multichoice",
}

export interface FieldData {
  label: string;
  required: boolean;
  fieldType: FieldType;
  options?: string[];
}

export interface FormCreationData {
  title: string;
  description: string;
  fields: FieldData[];
  openAt: string;
  closeAt: string;
}

export interface CreatedForm {
  id: string;
  title: string;
  owner: string;
  description: string;
  createdAt: string;
  openAt: string;
  closeAt: string;
  fields: {
    label: string;
    description: string;
    fieldType: string;
    required: boolean;
  }[];
}

export interface CreateFormDto {
  title: string;
  description: string;
  openAt: string;
  closeAt: string;
  data: string; // JSON.stringify
}
