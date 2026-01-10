"use client";

import {
    Control,
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    Path,
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
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import {
    CalendarIcon,
    Check,
    ChevronDownIcon,
    ChevronsUpDown,
    Command,
    Eye,
    EyeOff,
    LucideIcon,
    SearchIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Label } from "./ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type ComboOption = {
    value: string;
    label: string;
};

interface FormComboBoxProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    options: ComboOption[];
    label?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
}

// type ComboOption = {
//     value: string;
//     label: string;
// };

// type ComboBoxProps = {
//     options: ComboOption[];
//     emptyText?: string; // Text to show when no search results found
//     searchPlaceholder?: string; // Placeholder inside the search input
// };

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
    placeholder?: string;
    required?: boolean;
    errorReserve?: boolean; // ✅ NEW
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
            required?: boolean;
            errorReserve?: boolean; // ✅ NEW
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
    errorReserve = false, // ✅
    placeholder,
    required,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
    // console.log({ errorReserve });
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                // const { formState } = form || {};
                // const { touchedFields, dirtyFields, isSubmitted } =
                //     formState || {};
                // const { isTouched, isDirty } = fieldState;

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
                    // ...fieldState
                });
                // const errorElem = fieldState.invalid && (
                // const errorElem = showError && (
                //     <FieldError errors={[fieldState.error]} />
                // );
                const errorContent = showError ? fieldState.error?.message : "";
                // const errorElem = (
                //     <FieldError className={errorReserve ? "min-h-5" : ""}>
                //         {errorReserve
                //             ? errorContent
                //             : showError && errorContent}
                //     </FieldError>
                // );
                const errorElem = (
                    <FieldError className={errorReserve ? "min-h-[20px]" : ""}>
                        {errorContent}
                    </FieldError>
                );

                return (
                    <Field
                        // data-invalid={fieldState.invalid}
                        data-invalid={showError}
                        orientation={horizontal ? "horizontal" : undefined}
                    >
                        {/* {controlFirst ? (
                            <>
                                {control}
                                <FieldContent>
                                    {labelElement}
                                    {errorElem}
                                </FieldContent>
                                {errorReserve
                                    ? errorElem
                                    : showError
                                    ? errorElem
                                    : null}
                            </>
                        ) : (
                            <>
                                <FieldContent>{labelElement}</FieldContent>
                                {control}
                                {errorElem}
                            </>
                        )} */}

                        {controlFirst ? (
                            <>
                                <FieldContent>{control}</FieldContent>
                                {labelElement}
                                {errorReserve
                                    ? errorElem
                                    : showError
                                    ? errorElem
                                    : null}
                            </>
                        ) : (
                            <>
                                {labelElement}
                                <FieldContent>{control}</FieldContent>
                                {errorReserve
                                    ? errorElem
                                    : showError
                                    ? errorElem
                                    : null}
                            </>
                        )}
                    </Field>
                );
            }}
        />
    );
}

// export const FormInput: FormControlFunc = props => {
export const FormInput: FormControlFunc<{
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
}> = ({ form, placeholder, required, type, errorReserve, ...props }) => {
    return (
        <FormBase {...props} errorReserve={errorReserve}>
            {(field) => (
                <Input
                    {...field}
                    placeholder={placeholder}
                    required={required}
                    type={type}
                    // type='color'
                />
            )}
        </FormBase>
    );
};

export const FormInputGroup: FormControlFunc<{
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    icon?: LucideIcon;
    className?: string;
}> = ({
    form,
    placeholder = "Search...",
    required,
    type,
    errorReserve,
    icon: Icon,
    ...props
}) => {
    return (
        <FormBase {...props} errorReserve={errorReserve}>
            {(field) => (
                <InputGroup className={props.className}>
                    <InputGroupInput placeholder={placeholder} />
                    <InputGroupAddon>
                        {/* <SearchIcon /> */}
                        {Icon ? <Icon className="size-4" /> : <SearchIcon />}
                    </InputGroupAddon>
                </InputGroup>
            )}
        </FormBase>
    );
};

export const FormTextarea: FormControlFunc = ({
    form,
    errorReserve,
    ...props
}) => {
    return (
        <FormBase {...props} form={form} errorReserve={errorReserve}>
            {(field) => <Textarea {...field} placeholder={props.placeholder} />}
        </FormBase>
    );
};

export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({
    children,
    errorReserve,
    ...props
}) => {
    return (
        <FormBase {...props} errorReserve={errorReserve}>
            {/* {({ onChange, onBlur, ...field }) => ( */}
            {(
                field // ✅ ALL props including fieldState
            ) => (
                <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger
                        aria-invalid={field["aria-invalid"]}
                        id={field.id}
                        onBlur={field.onBlur}
                        className="w-full"
                        tabIndex={0}
                    >
                        <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                    <SelectContent>{children}</SelectContent>
                </Select>
            )}
        </FormBase>
    );
};

export const FormCheckbox: FormControlFunc = (props) => {
    return (
        <FormBase {...props} horizontal controlFirst label={null}>
            {({ onChange, value, ...field }) => (
                // <Checkbox
                //     {...field}
                //     checked={value}
                //     onCheckedChange={onChange}
                // />
                <label className="flex items-center gap-2 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            {...field}
                            checked={value}
                            onCheckedChange={onChange}
                        />
                        <span className="text-sm font-medium text-foreground">
                            {props.label}
                        </span>
                    </div>
                </label>
            )}
        </FormBase>
    );
};

export const FormSwitch: FormControlFunc = ({
    form,
    errorReserve,
    label,
    ...props
}) => {
    return (
        <FormBase
            {...props}
            form={form}
            errorReserve={errorReserve}
            // render label next to switch instead of the default placement
            horizontal={false}
            controlFirst={false}
            label={null}
        >
            {({ onChange, value, ...field }) => (
                // <label className="flex items-center gap-3 cursor-pointer">
                <div className="flex items-center space-x-3">
                    <label className="flex gap-3">
                        <span className="text-sm font-medium text-foreground cursor-pointer">
                            {label}
                        </span>
                        <Switch
                            {...field}
                            checked={!!value}
                            onCheckedChange={onChange}
                        />
                    </label>
                </div>
            )}
        </FormBase>
    );
};

export const FormDate: FormControlFunc<{
    buttonClassName?: string;
}> = ({
    form,
    errorReserve,
    label,
    buttonClassName,
    placeholder = "Select date",
    ...props
}) => {
    return (
        <FormBase
            {...props}
            form={form}
            errorReserve={errorReserve}
            // normal label placement (above / left), like inputs
            horizontal={false}
            controlFirst={false}
            label={label}
        >
            {/* {({ onChange, value }) => { */}
            {(field) => {
                const [open, setOpen] = useState(false);

                // const dateValue =
                //   value instanceof Date || value === null || value === undefined
                //     ? value
                //     : value ? new Date(value) : undefined;

                const dateValue =
                    (field.value as unknown as Date | null) ?? undefined;

                //  const showError = !!fieldState.error && fieldState.isTouched; // ✅ get from field
                const hasError = field["aria-invalid"];

                return (
                    <div
                        id={field.name} // ✅ link to FormBase id
                        onBlur={field.onBlur} // ✅ trigger touched
                        tabIndex={-1} // allows blur events
                    >
                        <Popover open={open} onOpenChange={setOpen}>
                            {/* <PopoverTrigger asChild onBlur={field.onBlur} id={field.name}>  */}
                            <PopoverTrigger
                                asChild
                                // onBlur={field.onBlur}
                                // id={field.name}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(true)} // ✅ proper focus handling
                                    // className={
                                    //     buttonClassName ??
                                    //     "w-full justify-between font-normal text-left"
                                    // }
                                    className={cn(
                                        "w-full justify-between font-normal text-left",
                                        // ✅ use aria-invalid for error styling
                                        hasError &&
                                            "border-destructive text-destructive hover:bg-destructive/5 focus-visible:ring-destructive",
                                        !dateValue && "text-muted-foreground"
                                    )}
                                >
                                    {dateValue
                                        ? dateValue.toLocaleDateString()
                                        : // : "Select date"}
                                          placeholder}
                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    captionLayout="dropdown"
                                    selected={dateValue}
                                    // react-hook-form expects either Date or null/undefined
                                    onSelect={(d) => {
                                        field.onChange(d ?? null);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            }}
        </FormBase>
    );
};

export const FormPassword: FormControlFunc<{
    placeholder?: string;
}> = ({ form, placeholder, required, errorReserve, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormBase
            form={form}
            control={props.control}
            name={props.name}
            label={props.label}
            description={props.description}
            required={required}
            errorReserve={errorReserve}
            placeholder={placeholder}
        >
            {(field) => (
                <div className="relative ">
                    <Input
                        // id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        className={cn(
                            "pr-12", // Space for eye icon
                            field["aria-invalid"] &&
                                "border-destructive text-destructive focus-visible:ring-destructive"
                        )}
                        {...field}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                            {showPassword ? "Hide" : "Show"} password
                        </span>
                    </Button>
                </div>
            )}
        </FormBase>
    );
};

//////////////////////////////////////////////////
type DisplayProps = {
    label: ReactNode;
    //   description?: ReactNode
    value?: ReactNode;
    horizontal?: boolean;
};

export function FormDisplay({
    label,
    //   description,
    value,
    horizontal,
}: DisplayProps) {
    const content = (
        <>
            {/* {description && <FieldDescription>{description}</FieldDescription>} */}
            <FieldLabel className="">{label}</FieldLabel>
            <div className="mt-1 text-sm text-foreground pl-1">
                {value ?? "-"}
            </div>
        </>
    );

    return (
        <Field className={horizontal ? "flex items-start gap-6" : ""}>
            <FieldContent>{content}</FieldContent>
        </Field>
    );
}
