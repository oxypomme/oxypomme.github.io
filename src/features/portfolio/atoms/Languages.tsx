import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3Alt, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const LanguageItem = styled.li`
    & > svg {
        margin-right: 5px;
        vertical-align: middle;
    }
`;

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Languages = () => {
    return (
        <Card>
            <h3><FontStyledIcon icon={faCode} />Langages couramment pratiqués</h3>
            <HiddenList>
                <LanguageItem>C#</LanguageItem>
                <LanguageItem>TypeScript</LanguageItem>
                <LanguageItem><FontAwesomeIcon icon={faHtml5} color="orangered" />HTML</LanguageItem>
                <LanguageItem><FontAwesomeIcon icon={faCss3Alt} color="dodgerblue" />CSS</LanguageItem>
            </HiddenList>
        </Card>
    );
}

export default Languages;