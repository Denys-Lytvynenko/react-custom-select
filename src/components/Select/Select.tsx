import { FC, useCallback, useEffect, useRef, useState } from "react";

import { SelectOption, SelectProps } from "./types";

import styles from "./select.module.css";

const noOptions: SelectOption[] = [
    { label: "Options are empty", value: "Options are empty" },
];

const Select: FC<SelectProps> = ({
    multiple,
    onChange,
    value,
    options = noOptions,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const clearOptions = useCallback(() => {
        multiple ? onChange([]) : onChange(undefined);
    }, [multiple, onChange]);

    const selectOption = useCallback(
        (option: SelectOption) => {
            if (multiple) {
                if (value.includes(option)) {
                    onChange(value.filter((o) => o !== option));
                } else {
                    onChange([...value, option]);
                }
            } else {
                if (option !== value) onChange(option);
            }
        },
        [multiple, onChange, value]
    );

    const isOptionSelected = (option: SelectOption) =>
        multiple ? value.includes(option) : option === value;

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    useEffect(() => {
        const currentRef = containerRef.current;

        /**
         * Keyboard handler function
         */
        const handler = (e: KeyboardEvent): void => {
            if (e.target !== currentRef) return;

            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen((prev) => !prev);
                    if (isOpen) selectOption(options[highlightedIndex]);
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue =
                        highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                case "Delete":
                    clearOptions();
                    break;
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        };

        currentRef?.addEventListener("keydown", handler);

        return () => {
            currentRef?.removeEventListener("keydown", handler);
        };
    }, [isOpen, highlightedIndex, options, selectOption, clearOptions]);

    return (
        <div
            ref={containerRef}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
            className={`${styles.container} ${className ? className : ""}`}
        >
            <div className={styles.value}>
                {multiple
                    ? value.map((v) => (
                          <button
                              key={v.value}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  selectOption(v);
                              }}
                              className={styles["option-badge"]}
                          >
                              {v.label}
                              <span className={styles["remove-btn"]}>
                                  &times;
                              </span>
                          </button>
                      ))
                    : value?.label}
            </div>

            <button
                onClick={(e) => {
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
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
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
