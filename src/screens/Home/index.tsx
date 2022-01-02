import React, {useCallback} from 'react';

import happyEmoji from '../../assets/happy.png';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {Container, Header, Greeting, GreetingEmoji, GreetingText} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Home() {
    const {COLORS} = useTheme();

    return (
        <Container>
            <Header>
              <Greeting>
                  <GreetingEmoji source={happyEmoji}/>
                  <GreetingText>Olá, Admin</GreetingText>
              </Greeting>
               <TouchableOpacity>
              <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
              </TouchableOpacity>
            </Header>
        </Container>
    )
}


