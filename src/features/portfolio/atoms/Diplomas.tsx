import React from 'react';
import styled from '@emotion/styled';

import { FirebaseDatabaseNode } from '@react-firebase/database';
import '@firebase/database';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import DiplomaCard, { IDiploma } from "./protons/DiplomaCard";

const DiplomaContainer = styled.div`
    margin: 0 20px;

    & > div {
        width: 89.335vw;
        max-width: 700px;
        margin: 20px auto;
    }
`;

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Diplomas = () => {
    return (
        <DiplomaContainer>
            <h3><FontStyledIcon icon={faGraduationCap} />Diplômes et formations</h3>
            <FirebaseDatabaseNode
                path="/diplomas/"
                orderByKey
            >
                {data => !data.isLoading && data.value != null ?
                    data.value.reverse().map((diploma: IDiploma, key: number) => <DiplomaCard key={key} {...diploma} />)
                    : <p key={0}>{/*TODO:*/}Loading</p>}
            </FirebaseDatabaseNode>
        </DiplomaContainer >
    );
}

export default Diplomas;