import React from 'react';
import styled from '@emotion/styled';

import { FirebaseDatabaseNode } from '@react-firebase/database';
import '@firebase/database';

import DiplomaCard, { IDiploma } from "./protons/DiplomaCard";

const DiplomaContainer = styled.div`
    margin: 0 20px;

    & > div {
        margin: 20px auto;
    }
`;

const Diplomas = () => {
    return (
        <DiplomaContainer>
            <h3>Diplômes et formations</h3>
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