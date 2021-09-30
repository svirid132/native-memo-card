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
        return (<Card
            key = {card.id}
            {...card}
            name = {card.name}
            onPress = {(e) => {
                alert("this");
                dispatch(clickOnCard(card.id));
                e.stopPropagation();
            }}
        /> );
    });

    const handleClickField = (e) => {
        dispatch(clickOnField());
    }

    //onPress={handleClickField}
    return (
        <View >
            <Wrapper onPress={(e) => handleClickField(e)}>
                <WrapperInternal>
                    { cardElems }
                </WrapperInternal>
            </Wrapper>
        </View>
    );
};

        // overflow: hidden;

const Wrapper = styled.TouchableOpacity`
`
const WrapperInternal = styled.View`
    display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        width: 100%;
        max-width: 1024px;
        margin: 0 auto;

        background-color: orange;
        padding-right: 3px;
`
export default FieldGame
