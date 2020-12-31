import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
    height: var(--nav-size);
    width: 100%;
    position: fixed;
    float: left;
    top: 0;
    z-index: 9999;
`;

const NavList = styled.ul`
    height: 100%;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    background-color: var(--background-dark);
`;

const NavItem = styled.li`
    height: 100%;
    float: left;

    & > a {
        display: inline-block;
        color: var(--text);
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        height: 100%;
    }

    & > a:hover {
        background-color: var(--background-light);
    }

    & > a.active {
        background-color: var(--accent1);
    }
`;

const Navbar = () => {
    return (
        <Nav>
            <NavList>
                <NavItem><NavLink exact to="/" >Home</NavLink></NavItem>
                <NavItem><NavLink exact to="/portfolio" >Portfolio</NavLink></NavItem>
            </NavList>
        </Nav>
    );
}

export default Navbar;