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

    const onSelectOption = (option: SortBy) => {
        setSortBy(option)
        hideOptions()
        onChange?.(option)
    }

    const handleOnOptionClick = (option: SortBy) => () => {
        onSelectOption(option)
    }

    const handleOnKeyDown = (index: number) => (e: any) => {
        if (e.key !== 'Enter') {
            return
        }
        onSelectOption(Object.values(SortBy)[index])
    }

    return (
        <div className="sorter">
            <button className="sorter__button" onClick={handleOnSortButtonClick} tabIndex={1}>
                {sortBy}
            </button>
            <ul className={`sorter__options ${optionsAreVisible ? "visible" : ""}`.trim()}>
                {Object.entries(SortBy).map(([key, option], i) => (
                    <li
                        key={key}
                        tabIndex={i + 2}
                        onKeyDown={handleOnKeyDown(i)}
                        className="sorter__options__li"
                        onClick={handleOnOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sorter;
