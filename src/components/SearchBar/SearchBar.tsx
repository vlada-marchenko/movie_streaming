"use client";

import Icon from "../Icon/Icon";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className={css.searchBar}>
      <Icon name="search" className={css.iconSearch} width={18} height={18} />
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={css.input}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className={css.clearButton}
          aria-label="Clear search"
        >
          <Icon name="x" className={css.iconX} width={18} height={18} />
        </button>
      )}
    </div>
  );
}
