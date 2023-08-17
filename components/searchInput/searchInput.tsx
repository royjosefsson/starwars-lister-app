import { Svg } from "@/assets"
import { ChangeEvent } from "react"

interface SearchInputProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ onChange }: SearchInputProps) => {
    return (
        <div className="search-input">
            <Svg.Search />
            <input
                className="search-input__input"
                type="text"
                onChange={onChange}
                placeholder="Type to filter..."
                tabIndex={7}
            />
        </div>
    )
}

export default SearchInput
