import React from 'react';

import { HiddenList, Card } from '../../../components/styledComponents';

const Civic = () => {
    const [age, setAge] = React.useState<number>(18);

    React.useEffect(() => {
        setAge(new Date().getFullYear() - 2001);
    }, [])

    return (
        <Card>
            <h3>Informations civiles</h3>
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