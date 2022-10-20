import { useState } from "react";

import { SelectOption } from "./components/Select/types";

import Select from "./components/Select/Select";

import "./App.css";

/**
 * Mocked data
 */
const options: SelectOption[] = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
];

const App = () => {
    const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);
    const [value2, setValue2] = useState<SelectOption[] | []>([]);

    return (
        <div className="container">
            <Select
                options={options}
                value={value1}
                onChange={(o) => setValue1(o)}
            />

            <Select
                multiple
                options={options}
                value={value2}
                onChange={(o) => setValue2(o)}
            />
        </div>
    );
};

export default App;
