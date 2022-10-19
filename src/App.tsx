import { useState } from "react";

import { SelectOption } from "./components/Select/types";

import Select from "./components/Select/Select";

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
    const [value, setValue] = useState<typeof options[0] | undefined>(
        options[0]
    );

    return (
        <div>
            <Select
                options={options}
                value={value}
                onChange={o => setValue(o)}
            />
        </div>
    );
};

export default App;
