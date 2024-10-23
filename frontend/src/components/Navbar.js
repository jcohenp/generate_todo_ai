// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faSearch, faCalendarAlt, faTasks, faFolderOpen } from '@fortawesome/free-solid-svg-icons'; // Icons

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.navbarBg};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100px;  // Adjust width for icon size
  height: 100vh; // Full height of the viewport
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem 0;
  position: relative;

  &:hover::after {
    content: attr(data-label);  // Display text on hover
    position: absolute;
    left: 120%;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    color: ${({ theme }) => theme.textHover};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/search" data-label="Search">
        <Icon icon={faSearch} />
      </NavLink>
      <NavLink to="/calendar" data-label="Calendar">
        <Icon icon={faCalendarAlt} />
      </NavLink>
      <NavLink to="/" data-label="My Tasks">
        <Icon icon={faTasks} />
      </NavLink>
      <NavLink to="/workspace" data-label="Workspace">
        <Icon icon={faFolderOpen} />
      </NavLink>
    </Nav>
  );
};

export default Navbar;
