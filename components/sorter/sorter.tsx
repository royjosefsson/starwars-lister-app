import { SortBy } from "@/enums/sortBy";
import { useState } from "react";

interface SorterProps {
    onChange?: (option: SortBy) => void
}

const Sorter = ({ onChange }: SorterProps) => {
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.default)
    const [optionsAreVisible, setOptionsAreVisible] = useState<boolean>(false)

    const handleOnSortButtonClick = () => {
        setOptionsAreVisible((prev) => !prev)
    }

    const hideOptions = () => {
        setOptionsAreVisible(false)
    }

    const onSelectOption = (option: SortBy) => () => {
        setSortBy(option)
        hideOptions()
        onChange?.(option)
    }

    return (
        <div className="sorter">
            <button className="sorter__button" onClick={handleOnSortButtonClick} tabIndex={1}>
                {sortBy === SortBy.default ? "Sort by..." : sortBy}
            </button>
            <ul className={`sorter__options ${optionsAreVisible ? "visible" : ""}`.trim()}>
                {Object.entries(SortBy).map(([key, option]) => (
                    <li
                        key={key}
                        className="sorter__options__li"
                        onClick={onSelectOption(option)}
                    >
                        {option === SortBy.default ? "Sort by..." : option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sorter;
