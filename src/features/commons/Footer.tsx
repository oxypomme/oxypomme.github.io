import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import { Separator } from "../../components/styledComponents";

import creditImg from "../../res/devByOxyPomme.svg";

// #region Styles

const Foot = styled.footer`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    background-color: var(--background-dark);

    text-align: center;
    font-size: 12px;

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

const IconWithLink = styled.a`
    vertical-align: middle;
    
    & > svg{
        margin: 5px;
        transition: opacity 0.25s;
    }

    & > svg:hover{
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
                >
                    <FontAwesomeIcon icon={faGithubSquare} size="2x" color="DimGray" />
                </IconWithLink>
                -
                <IconWithLink
                    href="https://twitter.com/OxyT0m8"
                    target="_blank"
                    rel="noreferrer"
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
                All icons used are from <a href="https://fontawesome.com">Font Awesome</a>.
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