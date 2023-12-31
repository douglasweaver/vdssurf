/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VDSNoteCreateFormInputValues = {
    name?: string;
    comments?: string;
    fileName?: string;
};
export declare type VDSNoteCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VDSNoteCreateFormOverridesProps = {
    VDSNoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VDSNoteCreateFormProps = React.PropsWithChildren<{
    overrides?: VDSNoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VDSNoteCreateFormInputValues) => VDSNoteCreateFormInputValues;
    onSuccess?: (fields: VDSNoteCreateFormInputValues) => void;
    onError?: (fields: VDSNoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VDSNoteCreateFormInputValues) => VDSNoteCreateFormInputValues;
    onValidate?: VDSNoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function VDSNoteCreateForm(props: VDSNoteCreateFormProps): React.ReactElement;
