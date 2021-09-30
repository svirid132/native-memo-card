import {memo} from 'react'
import Front, {FRONT_STATE} from "./Front";
import Back from './Back';
import styled from 'styled-components/native'
import React from "react"
import { TouchableOpacity, View } from 'react-native';

export const CARD_STATE = {
    FRONT: "FRONT",
    BACK: "BACK",
    HIDDEN: "HIDDEN",
}

const Card = ({image, name, onPress, state, style, size}) => {

    let viewBack = null;
    let stateFront = null; 
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
            break;
        }
        default: {}
    }
//onPress = {(e) => onPress(e)}
    return (
        <TouchableOpacity style = {style} onPress = {() => {
            onPress();
        }}>
            <Wrapper>
                <BackStyled style={style} view = {viewBack} size/>
                <FrontStyled style={style} image = {image} name={name} state = {stateFront} size={size}/>
            </Wrapper>
        </TouchableOpacity>
    )
};

const BackStyled = styled(Back)`
    position: absolute;
`

const FrontStyled = styled(Front)`
    position: absolute;
`

const Wrapper = styled.View`
    position: relative;
    margin-top: 2px; 
    margin-bottom: 2px;
    margin-right: 1px;
    margin-left: 1px;
`

export default memo(Card);
