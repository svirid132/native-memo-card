import styled, {css} from "styled-components/native"
import React, {useState} from 'react'
import CardLoader from './CardLoader'
import { Image, View, Text } from "react-native"

const IMG_POSITION = {
    VERTICAL: "VERTICAL",
    HORIZONTAL: "HORIZONTAL",
}

export const FRONT_STATE = {
    VIEW: "VIEW",
    UNVIEW: "UNVIEW",
    HIDDEN: "HIDDEN",
}

function Front({image, name, state, style}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(image ? false : true);

    let hidden = false;
    let view = false;
    switch(state) {
        case FRONT_STATE.VIEW: {
            view = true;
            break;
        }
        case FRONT_STATE.HIDDEN: {
            view = true;
            hidden = true;
            break;
        }
        default: {}
    }

    let imagePosition = null;
    if (image) {
        imagePosition = image.width > image.height ? IMG_POSITION.VERTICAL : IMG_POSITION.HORIZONTAL;
    }

    return (
        <View style = {style}>
            <Wrapper
                view = {view}
                delayHidden = {hidden}
            >
                {isError && !image && <Error name= {"name.replaceAll('_', ' ')"}/>}
                { !isLoaded && !isError && image && <CardLoader style={{zIndex: 1, position: "absolute"}}/> }
                { image &&
                    <Img 
                    src = {image.src}
                    vertical = {imagePosition === IMG_POSITION.VERTICAL}
                    horizontal = {imagePosition ===  IMG_POSITION.HORIZONTAL}
                    onLoad = {() => setIsLoaded(true)} 
                    onError={() => setIsError(true)}
                />}
            </Wrapper>
        </View>
    )
}

    // transition: transform 0.5s linear, opacity 1s 1s;

const Wrapper = styled.View`
    transform: rotateY(180deg) perspective(1200);
    width: 20px;
    height: 30px;
    backface-visibility: hidden;
    opacity: 1;
    position: relative;

    ${props => props.view && css`
        transform: rotateY(0deg) perspective(1200);
    `}
    ${props => (props.delayHidden && css`
        opacity: 0;
    `)}
`
const Error = styled( ({name, style}) => (
    <View style = {style}>
        {(() => {
            const TextStyled = styled.Text`
                font-size: 3px;
                color: white;
            `
            return <TextStyled>{name}</TextStyled>
        })()}
        {(() => {
            const TextStyled = styled.Text`
                color: white;
                margin-top: 3px;
                font-size: 2px;
                width: 15px;
            `
            return <TextStyled>Картинка не загрузилась</TextStyled>
        })()}
    </View>
))`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 30px;
    text-align: center;
    background-color: gray;
    border-radius: 10px;
`;

const Img = styled.Image.attrs((props => ({
    onLoad: props.onLoad,
    onError: props.onError,
})))`
    z-index: 10;
    border-radius: 10px;
    ${props => (props.vertical && css`
        width: 30px;
        height: 20px;
        object-fit: cover;
        transform: rotate(-90deg);
        transform-origin: 50% 75%;
    `)}
    ${props => (props.horizontal && css`
        width: 20px;
        height: 30px;
        object-fit: cover;
    `)}
` 

Front.defaultProps = {
    name: "???",
}

export default Front;
