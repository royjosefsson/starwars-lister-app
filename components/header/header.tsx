import { ChangeEvent } from "react"
import { Sorter } from "@/components/sorter"
import { SortBy } from "@/enums/sortBy"
import { SearchInput } from "@/components/searchInput"

interface HeaderProps {
    onSearchInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onSorterOrderChange?: (order: SortBy) => void
}

const Header = ({ onSorterOrderChange, onSearchInputChange }: HeaderProps) => (
    <header className="header">
        <div className="header__content container">
            <Sorter onChange={onSorterOrderChange} />
            <SearchInput onChange={onSearchInputChange} />
        </div>
    </header>
)

export default Header
