import styled, {css} from "styled-components/native"
import React, {useState, useEffect} from 'react'
import CardLoader from './CardLoader'
import { Image, View, Text, StyleSheet } from "react-native"
import { withAnchorPoint } from 'react-native-anchor-point';
import ImageRotate from 'react-native-image-rotate';

const IMG_POSITION = {
    VERTICAL: "VERTICAL",
    HORIZONTAL: "HORIZONTAL",
}

export const FRONT_STATE = {
    VIEW: "VIEW",
    UNVIEW: "UNVIEW",
    HIDDEN: "HIDDEN",
}

const getTransform = (imagePosition, size) => {
    // vertical = {imagePosition === IMG_POSITION.VERTICAL}
    // horizontal = {imagePosition ===  IMG_POSITION.HORIZONTAL}
    if (imagePosition === IMG_POSITION.VERTICAL) return null
    let transform = {
        transform: [
            { rotate: "-90deg" },
        ],
    };
    return withAnchorPoint(transform, { x: 0.5, y: 0.75 }, { width: size.height, height: size.width });
};


function replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

function Front({image, name, state, style, size}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(image ? false : true);
    const [rotateImage, setRotateImage] = useState(null);

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
        imagePosition = image.width > image.height ? IMG_POSITION.HORIZONTAL : IMG_POSITION.VERTICAL;
    }

    // currentAngle: nextAngle,
    // width: this.state.height,
    // height: this.state.width,

    useEffect(() => {
        if (image) {;
            ImageRotate.rotateImage(
                image.src,
                image.width > image.height ? -90 : 0,
                (uri) => {
                    setRotateImage({
                        src: uri,
                        width: image.width,
                        heigth: image.height,
                    });
                },
                (error) => {
                console.error(error);
                }
            );
        }
    }, [image])

    return (
        <View style = {style}>
            <Wrapper
                view = {view}
                delayHidden = {hidden}
            >
                {isError && !image && <Error name= {replaceAll(name, "_", " ")}/>}
                { !isLoaded && !isError && image && <CardLoader style={{zIndex: 1, position: "absolute"}}/> }
                { image &&
                    <Image 
                        style = {[styles.img, style, getTransform(imagePosition, size)]}
                        source={{uri: image.src}}
                        onLoad = {() => setIsLoaded(true)} 
                        onError={() => setIsError(true)}
                    />
                }
            </Wrapper>
        </View>
    )
}

var styles = StyleSheet.create({
    img: {
        resizeMode: "cover", 
    }
})

    // transition: transform 0.5s linear, opacity 1s 1s;

const Wrapper = styled.View`
    transform: rotateY(180deg) perspective(1200);
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

// transform-origin: 50% 75%;

const Error = styled( ({name, style}) => (
    <View style = {style}>
        {(() => {
            const TextStyled = styled.Text`
                font-size: 16px;
                color: white;
                text-align: center;
            `
            return <TextStyled>{name}</TextStyled>
        })()}
        {(() => {
            const TextStyled = styled.Text`
                color: white;
                margin-top: 5px;
                font-size: 12px;
                text-align: center;
            `
            return <TextStyled>Картинка не загрузилась</TextStyled>
        })()}
    </View>
))`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: gray;
    border-radius: 10px;
    height: 100%;
`;

//        width: 30px;
//        height: 20px;

//        width: 20px;
//        height: 30px;

//        object-fit: cover;

// ${props => (props.vertical && css`
// width: 140,
// height: 100,
// `)}
// ${props => (props.horizontal && css`
// width: 100,
// height: 140,
// `)}

Front.defaultProps = {
    name: "???",
}

export default Front;
