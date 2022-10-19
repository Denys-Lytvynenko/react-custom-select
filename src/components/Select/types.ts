export type SelectOption = {
    label: string;
    value: string | number;
};

export type SelectProps = {
    onChange: (value: SelectOption | undefined) => void;
    options?: SelectOption[];
    value?: SelectOption;
};
