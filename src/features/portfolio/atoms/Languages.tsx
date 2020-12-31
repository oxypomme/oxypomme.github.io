import React from 'react';

import { HiddenList, Card } from '../../../components/styledComponents';

const Languages = () => {
    return (
        <Card>
            <h3>Langages couramment pratiqués</h3>
            <HiddenList>
                <li>C#</li>
                <li>TypeScript</li>
                <li>HTML</li>
                <li>CSS</li>
            </HiddenList>
        </Card>
    );
}

export default Languages;