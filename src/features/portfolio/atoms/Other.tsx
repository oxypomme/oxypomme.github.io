import React from 'react';

import { HiddenList, Card } from '../../../components/styledComponents';

const Other = () => {
    return (
        <Card>
            <h3>Autre compétences</h3>
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