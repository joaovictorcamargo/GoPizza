import React from "react";
import { TouchableOpacityProps } from "react-native";

import {Container, Image, Name, Description, StatusContainer, StatusLabel, StatusTypesProps} from './styles';

type Props = TouchableOpacityProps & {
    index: number;
}

export const function OrderCard({index, ...rest}: Props) {
    return (
        <Container
        index={index} {...rest}
        >

            <Image 
            source={{ uri: 'https://github.com/joaovictorcamargo.png'}}
            ></Image>

        </Container>
    )
}