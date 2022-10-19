import { FC, useEffect, useState } from "react";

import { SelectOption, SelectProps } from "./types";

import styles from "./select.module.css";

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<
        number | undefined
    >(0);

    const clearOptions = () => onChange(undefined);

    const selectOption = (option: SelectOption) => {
        if (option !== value) onChange(option);
    };
    const isOptionSelected = (option: SelectOption) => option === value;

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
            className={styles.container}
        >
            <div className={styles.value}>{value?.label}</div>

            <button
                onClick={e => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className={styles["clear-btn"]}
            >
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>

            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onMouseLeave={() => setHighlightedIndex(undefined)}
                        className={`${styles.option} ${
                            isOptionSelected(option) ? styles.selected : ""
                        } ${
                            index === highlightedIndex ? styles.highlighted : ""
                        }`}
                        key={option.label}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
