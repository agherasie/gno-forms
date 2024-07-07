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
