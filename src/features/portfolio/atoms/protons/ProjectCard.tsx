import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, fab } from '@fortawesome/free-brands-svg-icons';

import { FirebaseDatabaseNode } from '@react-firebase/database';
import '@firebase/database';

import { Card, HiddenList, WaitingForData } from "../../../../components/styledComponents";
import ILanguage from "./ILanguage";

export interface IProject {
    isPersonal: boolean,
    name: string,
    infos: {
        semester: number,
        duration: number,
        group: number
    } | null,
    collaborators: string[] | null,
    goal: string,
    skills: string | null,
    languages: ILanguage[],
    techs: ILanguage[] | null,
    link: string | null
}

const PrjCard = styled(Card)`
    position: relative;
    height: 575px;
`;

const PersonalNotice = styled.p`
    color: orange;
`;

const Language = styled.li<{ bgColor: string | null, color: string | null }>`
    display: inline;
    margin: 0 5px 0 0;
    padding: 5px;
    background-color: ${props => props.bgColor ? props.bgColor : "transparent"};
    color: ${props => props.color ? props.color : "white"};
    border-radius: 5px;
    cursor: default;
    transition: opacity .25s;

    &:hover{
        opacity: 0.75;
    }
`;

const GitHubLink = styled.p`
    position: absolute;
    bottom: 0;

    & > svg {
        vertical-align: middle;
        margin-right: 5px;
        transition: opacity 0.25s;
    }

    &:hover > svg{
        opacity: 0.75;
    }
`;

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const ProjectCard = (project: IProject) => {
    return (
        <PrjCard>
            <h3>{project.name}</h3>
            {project.isPersonal ?
                <PersonalNotice>Projet personnel.{project.collaborators && <br />}{project.collaborators && "en collaboration avec " + project.collaborators.map((collab, key) => collab + (key + 1 !== project.collaborators?.length ? "," : "."))}</PersonalNotice>
                :
                <HiddenList>
                    <li><h4>Semestre concerné:</h4> Semestre {project.infos?.semester}</li>
                    <li><h4>Durée:</h4> {project.infos?.duration} semaines</li>
                    <li><h4>Nombre de personnes dans le groupe:</h4> {project.infos?.group}</li>
                </HiddenList>
            }
            <h4>Objectif :</h4>
            <p>{project.goal}</p>
            <h4>Compétences :</h4>
            {project.skills &&
                <p>{project.skills}</p>
            }
            <h4>Langage{project.languages.length > 1 ? 's' : ''} utilisé{project.languages.length > 1 ? 's' : ''} :</h4>
            <HiddenList>
                {project.languages.map((lang, key) =>
                    <FirebaseDatabaseNode
                        path={"/languages/" + lang}
                        orderByKey
                    >
                        {data => !data.isLoading && data.value ?
                            <Language {...key} color={data.value.textColor} bgColor={data.value.color}>{data.value.name}</Language>
                            : <WaitingForData key={key} />}
                    </FirebaseDatabaseNode>)}
            </HiddenList>
            {project.techs ?
                <div>
                    <h4>Technologie{project.techs.length > 1 ? 's' : ''} utilisée{project.techs.length > 1 ? 's' : ''} :</h4>
                    <HiddenList>
                        {project.techs.map((lang, key) =>
                            <FirebaseDatabaseNode
                                path={"/techs/" + lang}
                                orderByKey
                            >
                                {data => !data.isLoading && data.value ?
                                    <Language {...key} color={data.value.textColor} bgColor={data.value.color}>{data.value.icon ? <FontStyledIcon icon={fab[data.value.icon]} color={data.value.iconColor} /> : ''}{data.value.name}</Language>
                                    : <WaitingForData key={key} />}
                            </FirebaseDatabaseNode>)}
                    </HiddenList>
                </div>
                : ''
            }
            {project.link ?
                <GitHubLink>
                    <FontAwesomeIcon icon={faGithub} size="2x" color="DimGray" />
                    <a href={"https://github.com/" + project.link + "/"} target="_blank" rel="noreferrer">{project.link}</a>
                </GitHubLink>
                : ''
            }
        </PrjCard>
    );
}

export default ProjectCard;