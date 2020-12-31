import React from 'react';

import { FlexContainer } from "../../components/styledComponents";

import Civic from "./atoms/Civic";
import Languages from "./atoms/Languages";
import Tools from "./atoms/Tools";
import Other from "./atoms/Other";
import Diplomas from "./atoms/Diplomas";
import Experiences from "./atoms/Experiences";

const Me = () => {
    return (
        <section>
            <h2>A propos de moi</h2>
            <FlexContainer>
                <Civic />
                <Languages />
                <Tools />
                <Other />
                <Diplomas />
                <Experiences />
            </FlexContainer>
        </section>
    );
}

export default Me;