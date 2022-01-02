import styled, {css} from "styled-components/native";
import {RectButton} from  'react-native-gesture-handler';

export const Container = styled.View`
width: 100%,
`;

export const Content = styled(RectButton)`
flex-direction: row;
align-items: center;
`;

export const Image = styled.Image`
width: 104px;
height: 104px;
border-radius: 52px;
margin-right: 20px;
`;

export const Details = styled.View`
flex: 1;
`;

export const Name = styled.Text`
flex: 1;
font-size: 20px;

${({theme}) => css`
font-size: ${theme.FONTS.TITLE}
`}
`;