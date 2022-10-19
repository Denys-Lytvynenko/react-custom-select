export type SelectOption = {
    label: string;
    value: string | number;
};

export type SelectProps = {
    options: SelectOption[];
    onChange: (value: SelectOption | undefined) => void;
    value?: SelectOption;
};
