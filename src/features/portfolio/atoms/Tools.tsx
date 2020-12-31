import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Tools = () => {
    return (
        <Card>
            <h3><FontStyledIcon icon={faWrench} />Outils maitrisés</h3>
            <HiddenList>
                <li>Visual Studio Code/Community</li>
                <li><FontStyledIcon icon={faGitAlt} color="orangered" />Git</li>
                <li>Suite Office</li>
                <li>Suite Adobe</li>
            </HiddenList>
        </Card>
    );
}

export default Tools;