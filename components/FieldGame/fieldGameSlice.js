import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import data from './../../assets/data.json'
import randomaizer from './randomizer';
import {loadInfo as fetchData} from './fetchData';
import { CARD_STATE } from '../Card/Card';

const randNumArr = randomaizer(data.names.length * 2);
// const randNumArr = new Array(50).fill(null).map((item, index) => index % 2 ?  Math.floor(index / 2) + 26: Math.floor(index / 2) + 1);
const cards = randNumArr.map((cardId) => {
    let gameId = cardId;
    if (gameId > data.names.length) gameId -= data.names.length;
    return {
        id: cardId,
        name: data.names[gameId - 1],
        state: CARD_STATE.BACK,
    }
});

export const FIELD_GAME_STATE = {
    DESCRIPTION: "DESCRIPTION",
    SELECT_CARD: "SELECT_CARD",
    MATCHING: "MATHCHING",
    RESET: "RESET", 
}

const initialState = {
    selectCards: [],
    descriptionOnCard: null,//id
    cards: cards,
    state: FIELD_GAME_STATE.SELECT_CARD,
} 

const loadCardInfo = createAsyncThunk(
    'fieldGame/fetchData',
    async ({name}) => {
        const data = await fetchData(name);
        return data;
    }
);

export const loadCardInfos = () => (dispatch) => {
    data.names.forEach((name, index) => {
        dispatch(loadCardInfo({id: index + 1, name })); 
    });
}

export const fieldGameSlice = createSlice({
    name: 'fieldGame',
    initialState, 
    reducers: {
        clickOnCard: (state, action) => {
            const id = action.payload;
            let selectCard = null;
            state.cards.forEach((card) => {
                if (card.id === id) {
                    selectCard = Object.assign({}, card);
                }
            });

            switch(selectCard.state) {
                case CARD_STATE.HIDDEN: {
                    return;
                }
                case CARD_STATE.BACK: {
                    clickOnBackCard(state, selectCard);
                    return;
                }
                case CARD_STATE.FRONT: {
                    state.state = FIELD_GAME_STATE.DESCRIPTION;
                    state.descriptionOnCard = id;
                    return;
                }
                default: {}
            }

        },
        clickOnField: (state) => {
            if (state.selectCards.length === 2) {
                cardReset(state);
            }
        },
        switchOnSelectState: (state) => {
            state.state = FIELD_GAME_STATE.SELECT_CARD;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCardInfo.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                state.cards = state.cards.map((card) => {
                    const rest = state.cards.length / 2;
                    if (card.id % rest === id) {
                        const newCard = {
                            ...card,
                            ...action.payload,
                        };
                        return newCard;
                    }
                    return card;
                });
            })
            .addCase(loadCardInfo.rejected, (state, action) => {
            })
    }
});

function clickOnBackCard(state, selectCard) {
    switch(state.selectCards.length) {
        case 0: {
            turnOnFront(state, selectCard);
            break;
        }
        case 1: {
            const rest = state.cards.length / 2;
            let isMatching = false;
            const firstCard = state.selectCards[0]; 
            cards.forEach((secondCard) => {
                if (secondCard.id === firstCard.id) return;
                if (selectCard.id % rest === firstCard.id % rest) {
                    isMatching = true;
                }
            });
            if (isMatching) {
                state.cards = state.cards.map((card) => {
                    if (card.id % rest === firstCard.id % rest) {
                        return ({
                            ...card,
                            state: CARD_STATE.HIDDEN,
                        })
                    }
                    return card;
                });
                state.selectCards = [];
                state.state = FIELD_GAME_STATE.MATCHING;
            } else {
                turnOnFront(state, selectCard);
            }
            break;
        }
        case 2: {
            cardReset(state);
            break;
        }
        default: {}
    }
}

function cardReset (state) {
    state.cards = state.cards.map((card) => {
        if (card.state === CARD_STATE.FRONT) {
            return ({
                ...card,
                state: CARD_STATE.BACK,
            })
        }
        return card;
    });
    state.selectCards = [];
    state.state = FIELD_GAME_STATE.RESET;
}

function turnOnFront(state, selectCard) {
    state.cards = state.cards.map((card) => {
        if (card.id === selectCard.id) {
            return ({
                ...selectCard,
                state: CARD_STATE.FRONT,
            });
        } 
        return card;
    });
    state.selectCards.push({...selectCard, state: CARD_STATE.FRONT});
    state.state = FIELD_GAME_STATE.SELECT_CARD;
}

export const { clickOnCard, clickOnField, switchOnSelectState } = fieldGameSlice.actions;

export const selectCards = (state) => {
    return state.fieldGame.cards;
};

export const selectState = (state) => {
    return state.fieldGame.state;
}

export const selectDescription = (state) => {
    const id = state.fieldGame.descriptionOnCard;
    let description = null;
    state.fieldGame.cards.forEach((card) => {
        if (card.id === id) {
            description = {
                title: card.name,
                description: card.description,
                src: card.image?.src,
            }
        }
    });
    return description;
}

export default fieldGameSlice.reducer;