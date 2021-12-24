import styled, {css} from 'styled-components/native';
import { TextInput } from 'react-native';

{/*Exporting type soo then we can use it at index*/}
export type TypeProps = 'primary' | 'secondary';

{/*here we'r creating a new type soo them we can use it here*/}
type Props = {
    type: TypeProps;
}

export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
    placeholderTextColor: type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50
}))<Props>`
   width: 100%;
   height: 56px;
   background-color: transparent;
   border-radius: 12px,
   font-size: 14;
   padding: 7px 0;
   padding-left: 20px;
   margin-bottom: 16px;

   ${({theme, type}) => css`
   font-family: ${theme.FONTS.TEXT};
   border: 1px solid ${theme.COLORS.SHAPE}
   color: ${type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE};
   `}
`;