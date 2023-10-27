/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VDSBookingCreateFormInputValues = {
    guests?: string;
    description?: string;
    checkIn?: string;
    checkOut?: string;
    levels?: string[];
    autos?: string[];
    commitment?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type VDSBookingCreateFormValidationValues = {
    guests?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    checkIn?: ValidationFunction<string>;
    checkOut?: ValidationFunction<string>;
    levels?: ValidationFunction<string>;
    autos?: ValidationFunction<string>;
    commitment?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VDSBookingCreateFormOverridesProps = {
    VDSBookingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    guests?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    checkIn?: PrimitiveOverrideProps<TextFieldProps>;
    checkOut?: PrimitiveOverrideProps<TextFieldProps>;
    levels?: PrimitiveOverrideProps<SelectFieldProps>;
    autos?: PrimitiveOverrideProps<SelectFieldProps>;
    commitment?: PrimitiveOverrideProps<SelectFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VDSBookingCreateFormProps = React.PropsWithChildren<{
    overrides?: VDSBookingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VDSBookingCreateFormInputValues) => VDSBookingCreateFormInputValues;
    onSuccess?: (fields: VDSBookingCreateFormInputValues) => void;
    onError?: (fields: VDSBookingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VDSBookingCreateFormInputValues) => VDSBookingCreateFormInputValues;
    onValidate?: VDSBookingCreateFormValidationValues;
} & React.CSSProperties>;
export default function VDSBookingCreateForm(props: VDSBookingCreateFormProps): React.ReactElement;
