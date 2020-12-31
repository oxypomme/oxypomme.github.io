import React from 'react';
import styled from '@emotion/styled';

import { Card } from "../../../../components/styledComponents";

const DateP = styled.p`
    font-style: italic;
`

export interface IDiploma {
    name: string,
    location: string,
    date: [number, number]
}

const DiplomaCard = ({ name, location, date }: IDiploma) => {
    return (
        <Card>
            <h4>{name}</h4>
            <p>{location}</p>
            <DateP>De {date[0]} à {date[1]}</DateP>
        </Card>
    );
}

export default DiplomaCard;