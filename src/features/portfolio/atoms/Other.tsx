import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faLanguage, faSitemap } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const LanguageList = styled(HiddenList)`
    margin-left: 20px;
`;

const Other = () => {
    return (
        <Card>
            <h3><FontStyledIcon icon={faEllipsisH} />Autres compétences</h3>
            <HiddenList>
                <li><FontStyledIcon icon={faLanguage} />Langues :
                    <LanguageList>
                        <li>Français: Natif</li>
                        <li>Anglais: Moyen Supérieur</li>
                    </LanguageList>
                </li>
                <li><FontStyledIcon icon={faSitemap} />Connaissance du matériel informatique</li>
            </HiddenList>
        </Card>
    );
}

export default Other;