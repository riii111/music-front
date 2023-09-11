import React from "react";
import { IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBarComponent: React.FC<SearchBarProps> = ({
  onSearch,
  query,
  setQuery,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Input
        width="572px"
        height="47px"
        maxWidth="100%"
        top="22px"
        left="92px"
        background="#FFFFFF"
        position="absolute"
        type="text"
        placeholder=" Search..."
        value={query}
        onChange={handleInputChange}
      />
      <IconButton
        aria-label="Search"
        width="27px"
        height="27px"
        left="614px"
        top="32px"
        icon={<SearchIcon />}
        position="absolute"
        onClick={onSearch}
      />
    </>
  );
};
