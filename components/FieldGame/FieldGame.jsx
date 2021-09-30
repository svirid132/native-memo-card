// import Card from "../Card/Card";
import {
    selectCards,
} from './fieldGameSlice';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components/native";
import { clickOnCard, clickOnField } from "./fieldGameSlice";
import { View } from "react-native";
import Card from '../Card/Card';
import React from 'react';

const FieldGame = () => {

    const cards = useSelector(selectCards);
    const dispatch = useDispatch();

    const cardElems = cards.map((card, index) => {
        if (index > 8) return null;
        return (<Card
            key = {card.id}
            {...card}
            name = {card.name}
            style ={{width: 100, height: 140,}}
            size = {{width: 100, height: 140,}}
            onPress = {() => {
                dispatch(clickOnCard(card.id));
                // e.stopPropagation();
            }}
        /> );
    });

    const handleClickField = (e) => {
        dispatch(clickOnField());
    }
//onPress={(e) => handleClickField(e)}
    return (
        <View >
            <Wrapper >
                <WrapperInternal>
                    { cardElems }
                </WrapperInternal>
            </Wrapper>
        </View>
    );
};

        // overflow: hidden;

const Wrapper = styled.View`
`
const WrapperInternal = styled.View`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;

        width: 100%;
        height: 100%;
        margin: 0 auto;
        flex-direction: row;

        background-color: orange;
        padding-right: 3px;
`
export default FieldGame
