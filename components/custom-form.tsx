"use client";

import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { ReactNode } from "react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

type FormControlProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
> = {
    name: TName;
    label: ReactNode;
    description?: ReactNode;
    control: ControllerProps<
        TFieldValues,
        TName,
        TTransformedValues
    >["control"];
};

type FormBaseProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
    horizontal?: boolean;
    controlFirst?: boolean;
    form?: UseFormReturn<TFieldValues>; // ✅ Add form prop
    placeholder?: string
    required?: boolean
    children: (
        field: Parameters<
            ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
        >[0]["field"] & {
            "aria-invalid": boolean;
            id: string;
        }
    ) => ReactNode;
};

type FormControlFunc<
    ExtraProps extends Record<string, unknown> = Record<never, never>
> = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
>(
    props: FormControlProps<TFieldValues, TName, TTransformedValues> &
        ExtraProps & {
            // ✅ Add form prop
            form?: UseFormReturn<TFieldValues, any>;
            placeholder?: string;
            required?: boolean
        }
) => ReactNode;

function FormBase<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues
>({
    children,
    control,
    label,
    name,
    description,
    controlFirst,
    horizontal,
    form, // ✅ ADD THIS LINE
    placeholder,
    required
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const { formState } = form || {};
                const { touchedFields, dirtyFields, isSubmitted } =
                    formState || {};
                const { isTouched, isDirty } = fieldState;

                // const showError =
                //     ((isSubmitted && !dirtyFields?.[name]) ||
                //         (touchedFields?.[name] && dirtyFields?.[name])) &&
                //     fieldState.error;

                // const showError =
                //     ((isSubmitted && !isDirty) || (isTouched && isDirty)) &&
                //     !!fieldState.error;

                const showError = !!fieldState.error && fieldState.isTouched;


                const labelElement = (
                    <>
                        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                        {description && (
                            <FieldDescription>{description}</FieldDescription>
                        )}
                    </>
                );
                const control = children({
                    ...field,
                    id: field.name,
                    // "aria-invalid": fieldState.invalid,
                    "aria-invalid": showError,
                });
                // const errorElem = fieldState.invalid && (
                const errorElem = showError && (
                    <FieldError errors={[fieldState.error]} />
                );

                return (
                    <Field
                        // data-invalid={fieldState.invalid}
                        data-invalid={showError}
                        orientation={horizontal ? "horizontal" : undefined}
                    >
                        {controlFirst ? (
                            <>
                                {control}
                                <FieldContent>
                                    {labelElement}
                                    {errorElem}
                                </FieldContent>
                            </>
                        ) : (
                            <>
                                <FieldContent>{labelElement}</FieldContent>
                                {control}
                                {errorElem}
                            </>
                        )}
                    </Field>
                );
            }}
        />
    );
}

// export const FormInput: FormControlFunc = props => {
export const FormInput: FormControlFunc<{ type?: string }> = ({
    form,
    placeholder,
    required,
    ...props
}) => {
    return <FormBase {...props}>{(field) => <Input {...field} placeholder={placeholder} required={required} />}</FormBase>;
};

export const FormTextarea: FormControlFunc = (props) => {
    return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>;
};

export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({
    children,
    ...props
}) => {
    return (
        <FormBase {...props}>
            {({ onChange, onBlur, ...field }) => (
                <Select {...field} onValueChange={onChange}>
                    <SelectTrigger
                        aria-invalid={field["aria-invalid"]}
                        id={field.id}
                        onBlur={onBlur}
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>{children}</SelectContent>
                </Select>
            )}
        </FormBase>
    );
};

export const FormCheckbox: FormControlFunc = (props) => {
    return (
        <FormBase {...props} horizontal controlFirst>
            {({ onChange, value, ...field }) => (
                <Checkbox
                    {...field}
                    checked={value}
                    onCheckedChange={onChange}
                />
            )}
        </FormBase>
    );
};
