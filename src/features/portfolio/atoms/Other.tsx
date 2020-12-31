import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Other = () => {
    return (
        <Card>
            <h3><FontStyledIcon icon={faEllipsisH} />Autres compétences</h3>
            <HiddenList>
                <li>Langues :
                    <HiddenList>
                        <li>Français: Natif</li>
                        <li>Anglais: Moyen Supérieur</li>
                    </HiddenList>
                </li>
                <li>Connaissance du matériel informatique</li>
                <li>J'aime les patates sautées</li>
            </HiddenList>
        </Card>
    );
}

export default Other;