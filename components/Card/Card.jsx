import {memo} from 'react'
import Front, {FRONT_STATE} from "./Front";
import Back from './Back';
import styled from 'styled-components/native'
import React from "react"
import { View } from 'react-native';

export const CARD_STATE = {
    FRONT: "FRONT",
    BACK: "BACK",
    HIDDEN: "HIDDEN",
}

const Card = ({image, name, onPress, state}) => {

    let viewBack = null;
    let stateFront = null; 
    let viewCursor = true;
    switch (state) {
        case CARD_STATE.FRONT: {
            viewBack = false;
            stateFront = FRONT_STATE.VIEW;
            break;
        }
        case CARD_STATE.BACK: {
            viewBack = true;
            stateFront = FRONT_STATE.UNVIEW;
            break;
        }
        case CARD_STATE.HIDDEN: {
            viewBack = false;
            stateFront = FRONT_STATE.HIDDEN;
            viewCursor = false
            break;
        }
        default: {}
    }

    return (
        <View>
            <Wrapper  viewCursor = {viewCursor} onPress = {(e) => onPress(e)}>
                <BackStyled view = {viewBack}/>
                <FrontStyled image = {image} name={name} state = {stateFront}/>
            </Wrapper>
        </View>
    )
};

const BackStyled = styled(Back)`
    position: absolute;
`

const FrontStyled = styled(Front)`
    position: absolute;
`

const Wrapper = styled.TouchableOpacity `
    position: relative;
    margin-top: 2px; 
    margin-bottom: 2px;
    margin-right: 1px;
    margin-left: 1px;
    width: 20px;   
    height: 30px;
`

export default memo(Card);
