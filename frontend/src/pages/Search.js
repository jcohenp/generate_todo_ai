// frontend/src/pages/Search.js
import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 2rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid #444;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Search = () => {
  return (
    <SearchContainer>
      <h2>Search</h2>
      <Input type="text" placeholder="Search tasks or projects..." />
    </SearchContainer>
  );
};

export default Search;
