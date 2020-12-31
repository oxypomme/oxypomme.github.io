import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Civic = () => {
    const [age, setAge] = React.useState<number>(18);

    React.useEffect(() => {
        setAge(new Date().getFullYear() - 2001);
    }, [])

    return (
        <Card>
            <h3><FontStyledIcon icon={faUser} />Informations civiles</h3>
            <p>SUBLET Tom</p>
            <HiddenList>
                <li>Né le 28/08 ({age} ans)</li>
                <li>Département: Moselle</li>
                <li>Pays: France</li>
            </HiddenList>
        </Card>
    );
}

export default Civic;