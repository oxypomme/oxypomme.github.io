import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBabyCarriage, faUser, faFlag, faGlobeEurope, faSignature } from '@fortawesome/free-solid-svg-icons';

import { HiddenList, Card } from '../../../components/styledComponents';

const FontStyledIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
`;

const Civic = () => {
    const [age, setAge] = React.useState<number>(18);

    React.useEffect(() => {
        setAge(new Date(new Date().getTime() - new Date(2001, 7, 28).getTime()).getFullYear() - 1970);
    }, [])

    return (
        <Card>
            <h3><FontStyledIcon icon={faUser} />Informations civiles</h3>
            <p><FontStyledIcon icon={faSignature} />SUBLET Tom</p>
            <HiddenList>
                <li><FontStyledIcon icon={faBabyCarriage} />Né le 28/08 ({age} ans)</li>
                <li><FontStyledIcon icon={faFlag} />Département: Moselle</li>
                <li><FontStyledIcon icon={faGlobeEurope} />Pays: France</li>
            </HiddenList>
        </Card>
    );
}

export default Civic;