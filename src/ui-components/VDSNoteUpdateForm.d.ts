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
export declare type VDSNoteUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type VDSNoteUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VDSNoteUpdateFormOverridesProps = {
    VDSNoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VDSNoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: VDSNoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    vDSNote?: any;
    onSubmit?: (fields: VDSNoteUpdateFormInputValues) => VDSNoteUpdateFormInputValues;
    onSuccess?: (fields: VDSNoteUpdateFormInputValues) => void;
    onError?: (fields: VDSNoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VDSNoteUpdateFormInputValues) => VDSNoteUpdateFormInputValues;
    onValidate?: VDSNoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VDSNoteUpdateForm(props: VDSNoteUpdateFormProps): React.ReactElement;
