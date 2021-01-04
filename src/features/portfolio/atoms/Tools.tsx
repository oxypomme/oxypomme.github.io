import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { faFileExcel, faLaptopCode, faPhotoVideo, faWrench } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Tools = () => {
    return (
        <Card>
            <h3><FontStyledIcon icon={faWrench} />Outils maitrisés</h3>
            <HiddenList>
                <li><FontStyledIcon icon={faLaptopCode} color="#BB90EB" />Visual Studio Code/Community</li>
                <li><FontStyledIcon icon={faGitAlt} color="orangered" />Git</li>
                <li><FontStyledIcon icon={faFileExcel} color="green" />Suite Office</li>
                <li><FontStyledIcon icon={faPhotoVideo} color="#1FBAE0" />Suite Adobe</li>
            </HiddenList>
        </Card>
    );
}

export default Tools;