import styled, {css} from 'styled-components/native'
import React from 'react'
import { View } from 'react-native'

function Back({view, style}) {
    return (
        <View>
            <Wrraper view = {view}>
                <Img style = {style} source={require('../../assets/card.jpg')} />
            </Wrraper>
        </View>
    )
}

    // transition: transform 0.5s linear;

const Wrraper = styled.View`
    backface-visibility: hidden;
    transform: rotateY(-180deg) perspective(1200);
    ${props => (props.view && css`
        transform: rotateY(0deg) perspective(1200);
    `)};
`

const Img = styled.Image`
    border-radius: 10px;
`;

export default Back
