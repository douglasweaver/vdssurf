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
export declare type VDSBookingUpdateFormInputValues = {
    guests?: string;
    description?: string;
    checkIn?: string;
    checkOut?: string;
    levels?: string[];
    autos?: string[];
    commitment?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type VDSBookingUpdateFormValidationValues = {
    guests?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    checkIn?: ValidationFunction<string>;
    checkOut?: ValidationFunction<string>;
    levels?: ValidationFunction<string>;
    autos?: ValidationFunction<string>;
    commitment?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VDSBookingUpdateFormOverridesProps = {
    VDSBookingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    guests?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    checkIn?: PrimitiveOverrideProps<TextFieldProps>;
    checkOut?: PrimitiveOverrideProps<TextFieldProps>;
    levels?: PrimitiveOverrideProps<SelectFieldProps>;
    autos?: PrimitiveOverrideProps<SelectFieldProps>;
    commitment?: PrimitiveOverrideProps<SelectFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VDSBookingUpdateFormProps = React.PropsWithChildren<{
    overrides?: VDSBookingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    vDSBooking?: any;
    onSubmit?: (fields: VDSBookingUpdateFormInputValues) => VDSBookingUpdateFormInputValues;
    onSuccess?: (fields: VDSBookingUpdateFormInputValues) => void;
    onError?: (fields: VDSBookingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VDSBookingUpdateFormInputValues) => VDSBookingUpdateFormInputValues;
    onValidate?: VDSBookingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VDSBookingUpdateForm(props: VDSBookingUpdateFormProps): React.ReactElement;
