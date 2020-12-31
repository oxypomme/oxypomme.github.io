import React from 'react';
import styled from '@emotion/styled';
import { HashLink } from 'react-router-hash-link';

import Me from "../../features/portfolio/Me";
import Projects from "../../features/portfolio/Projects";

import { HiddenList, Separator } from '../../components/styledComponents';

const Anchor = styled.div`
    display: block;
    position: relative;
    visibility: hidden;
    top: calc(-1 * var(--nav-size));
`;

const Portfolio = () => {
    return (
        <div>
            <header>
                <h1>Portfolio</h1>
                <HiddenList>
                    <li><HashLink smooth to="#meAnchor">A propos de moi</HashLink></li>
                    <li><HashLink smooth to="#projectsAnchor">Mes réalisations</HashLink></li>
                </HiddenList>
            </header>
            <Separator />
            <main>
                <Anchor id="meAnchor" />
                <Me />
                <Separator />
                <Anchor id="projectsAnchor" />
                <Projects />
            </main>
        </div >
    );
}

export default Portfolio;