import { CARD_STATE } from "../Card/Card";
import { FIELD_GAME_STATE } from "./fieldGameSlice";
import fieldGameReducer, {clickOnCard, clickOnField} from "./fieldGameSlice";
import data from './../../assets/data.json'
import produce, { current } from "immer";

describe("Test main logic game", () => {

    //Without randomaizer => id = [1, 26, 2, 27, 3, 28, 4, 29]
    const randNumArr = new Array(50).fill(null).map((item, index) => index % 2 ?  Math.floor(index / 2) + 26: Math.floor(index / 2) + 1);
    const cards = randNumArr.map((cardId) => {
        let gameId = cardId;
        if (gameId > data.names.length) gameId -= data.names.length;
        return {
            id: cardId,
            name: data.names[gameId - 1],
            state: CARD_STATE.BACK,
        }
    });

    const initialState = {
        selectCards: [],
        cards: cards,
        state: FIELD_GAME_STATE.SELECT_CARD,
    } 

    describe("click on back card", () => {
        it("first click on first card", () => {
            const id = 1;
            const nextState = fieldGameReducer(initialState, clickOnCard(1));

            const equalState = getNewState(initialState, id, CARD_STATE.FRONT);

            expect(nextState).toEqual(equalState);
        });
        it("second click on first card", () => {
            const id = 1;
            const previousState = getNewState(initialState, id, CARD_STATE.FRONT);
            const nextState = fieldGameReducer(previousState, clickOnCard(id));

            const equalState = {...previousState, state: FIELD_GAME_STATE.DESCRIPTION};

            expect(nextState).toEqual(equalState);
        });
        it("second click on two card", () => {

            const previousState = produce(initialState, draft => {
                const card = draft.cards[0];
                card.state = CARD_STATE.FRONT;
                draft.selectCards.push({...card});
            });

            const secondId = 2;
            const nextState = fieldGameReducer(previousState, clickOnCard(secondId));

            const equalState = produce(previousState, draft => {
                const card = draft.cards[2];
                card.state = CARD_STATE.FRONT;
                draft.selectCards.push({...card});
            });

            expect(nextState).toEqual(equalState);
        });
        it("reset on click on thrid card", () => {

            const firstId = 1;
            const secondId = 2;
            let previousState = produce(initialState, draft => {
                editState(draft, firstId, CARD_STATE.FRONT);
            });
            previousState = produce(previousState, draft => {
                editState(draft, secondId, CARD_STATE.FRONT);
            });

            const threadId = 27;
            const nextState = fieldGameReducer(previousState, clickOnCard(threadId));

            const equalState = produce(initialState, draft => {
                draft = {...draft, state: FIELD_GAME_STATE.RESET};
                return draft;
            });

            expect(nextState).toEqual(equalState);
        });
        it("reset on click on field", () => {

            const firstId = 1;
            const secondId = 2;
            let previousState = produce(initialState, draft => {
                editState(draft, firstId, CARD_STATE.FRONT);
            });
            previousState = produce(previousState, draft => {
                editState(draft, secondId, CARD_STATE.FRONT);
            });

            const nextState = fieldGameReducer(previousState, clickOnField());

            const equalState = produce(initialState, draft => {
                draft = {...draft, state: FIELD_GAME_STATE.RESET};
                return draft;
            });

            expect(nextState).toEqual(equalState);
        });
        it("reset on click succes", () => {

            const previousState = produce(initialState, draft => {
                const card = draft.cards[0];//id = 1
                card.state = CARD_STATE.FRONT;
                draft.selectCards.push({...card, state: CARD_STATE.FRONT});
            });

            const secondId = 26;//index 1
            const nextState = fieldGameReducer(previousState, clickOnCard(secondId));

            const equalState = produce(previousState, draft => {
                const firstCard = draft.cards[0];
                const secondCard = draft.cards[1];
                firstCard.state = CARD_STATE.HIDDEN;
                secondCard.state = CARD_STATE.HIDDEN;

                draft.selectCards = [];
                draft.state = FIELD_GAME_STATE.MATCHING;
            });

            expect(nextState).toEqual(equalState);
        });
    });
});

function editState(state, id, cardState){
    state.cards = draftFlipCard(state.cards, id, cardState);
    if (cardState === CARD_STATE.FRONT) {
        const selectCard = state.cards.filter((card) => {
            if (card.id === id) {
                return card;
            }
        });
        state.selectCards.push({
            ...selectCard[0],
            state: cardState,
        });
    }
};

function draftFlipCard(cards, id, cardState) {
    cards = cards.map((card) => {
        if (card.id === id) {
            return ({
                ...card,
                state: cardState,
            })
        }
        return card;
    });
    return cards;
}

function getNewState(state, id, cardState) {
    const newState = Object.assign({}, state);
    const newCards = flipCard(newState.cards, id, cardState);
    newState.cards = newCards;
    if (cardState === CARD_STATE.FRONT) {
        const selectCard = newCards.filter((card) => {
            if (card.id === id) {
                return card;
            }
        });
        const newSelectCards = Object.assign([], state.selectCards);
        newSelectCards.push(selectCard[0]);
        newState.selectCards = newSelectCards;
    }
    return newState;
}

function flipCard(cards, id, cardState) {
    const newCards = cards.map((card) => {
        if (card.id === id) {
            return ({
                ...card,
                state: cardState,
            })
        }
        return card;
    });
    return newCards;
}