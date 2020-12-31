import React from 'react';

import { HiddenList, Card } from '../../../components/styledComponents';

const Tools = () => {
    return (
        <Card>
            <h3>Outils maitrisés</h3>
            <HiddenList>
                <li>Visual Studio Code/Community</li>
                <li>Git</li>
                <li>Suite Office</li>
                <li>Suite Adobe</li>
            </HiddenList>
        </Card>
    );
}

export default Tools;