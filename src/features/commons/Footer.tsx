import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFontAwesome, faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import { Separator } from "../../components/styledComponents";

import creditImg from "../../res/devByOxyPomme.svg";

// #region Styles

const Foot = styled.footer`
    height: var(--footer-size);

    background-color: var(--background-dark);

    text-align: center;
    font-size: 14px; 

    padding-bottom: 10px;
`;

const Image = styled.img`
    vertical-align: middle;
    margin-top: 5px;
    transition: opacity 0.25s;

    &:hover{
        opacity: 0.75;
    }
`;

const IconWithLink = styled.a<{ margin?: string }>`
    vertical-align: middle;
    text-decoration: none;

    & a {
        text-decoration: underline;
    }
    
    & > svg{
        ${props => props.margin ? "margin:" + props.margin + ";" : ''}
        transition: opacity 0.25s;
    }

    &:hover > svg{
        opacity: 0.75;
    }
`;

const Paragraph = styled.p`
    margin-top: 0;
`;

//#endregion

const Footer = () => {
    return (
        <Foot>
            <h3>Crédits</h3>
            <div>
                <a
                    href="https://shields.io/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image src={creditImg} alt="credits image" />
                </a>
            </div>
            <div>
                <IconWithLink
                    href="https://github.com/oxypomme"
                    target="_blank"
                    rel="noreferrer"
                    margin="5px"
                >
                    <FontAwesomeIcon icon={faGithubSquare} size="2x" color="DimGray" />
                </IconWithLink>
                -
                <IconWithLink
                    href="https://twitter.com/OxyT0m8"
                    target="_blank"
                    rel="noreferrer"
                    margin="5px"
                >
                    <FontAwesomeIcon icon={faTwitterSquare} size="2x" color="DodgerBlue" />
                </IconWithLink>
            </div>
            <Paragraph>
                <a
                    href="https://github.com/oxypomme/oxypomme.github.io/contributors"
                    target="_blank"
                    rel="noreferrer"
                >
                    Liste des contributeurs
                </a>
            </Paragraph>
            <Paragraph>
                All icons used are from <IconWithLink href="https://fontawesome.com"><FontAwesomeIcon icon={faFontAwesome} color="#339af0" /> Font Awesome</IconWithLink>.
            </Paragraph>
            <Separator />
            <div>
                <a
                    href="https://github.com/oxypomme/oxypomme.github.io/blob/master/LICENSE"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image src="https://img.shields.io/github/license/oxypomme/oxypomme.github.io?style=for-the-badge" />
                </a>
            </div>
        </Foot>
    );
}

export default Footer;