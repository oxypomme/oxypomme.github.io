import React from 'react';

import ProjectCard, { IProject } from "./atoms/protons/ProjectCard";
import { FlexContainer } from '../../components/styledComponents';
import { FirebaseDatabaseNode } from '@react-firebase/database';

const Projects = () => {
    return (
        <section>
            <h2>Réalisations</h2>
            <p>
                Rangé par ordre chronologique, les projets les plus récents apparaitrons en premier.
            </p>
            <FlexContainer>
                <FirebaseDatabaseNode
                    path="/projects/"
                    orderByKey
                >
                    {data => !data.isLoading && data.value != null ?
                        data.value.reverse().map((project: IProject, key: number) => <ProjectCard key={key} {...project} />)
                        : <p key={0}>{/*TODO:*/}Loading</p>}
                </FirebaseDatabaseNode>
            </FlexContainer>
        </section>
    );
}

export default Projects;