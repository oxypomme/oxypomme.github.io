import React from 'react';
import styled from '@emotion/styled';

import { FirebaseDatabaseNode } from '@react-firebase/database';
import '@firebase/database';

import DiplomaCard, { IDiploma } from "./protons/DiplomaCard";

const ExperiencesContainer = styled.div`
    margin: 0 20px;

    & > div  > div{
        width: 89.335vw;
        max-width: 700px;
        margin: 20px auto;
    }
`;

const Experiences = () => {
    return (
        <ExperiencesContainer>
            <FirebaseDatabaseNode
                path="/experiences/"
                orderByKey
            >
                {data => !data.isLoading && data.value && data.value[0].name ?
                    <div>
                        <h3>Experiences</h3>
                        {data.value != null && data.value.reverse().map(({ name, location, date }: IDiploma, key: number) => <DiplomaCard key={key} name={name} location={location} date={date} />)}
                    </div>
                    : <></>
                }
            </FirebaseDatabaseNode>
        </ExperiencesContainer >
    );
}

export default Experiences;