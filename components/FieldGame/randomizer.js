//array randomaizer for game
export default function randomaizer(length) {
    const randIdArr = new Array(length);
    const idArr = [];
    for (let i = 0; i < length; ++i) {
        idArr.push(i + 1);
    }
    for (let i = 0; i < length; ++i) {
        let numRange = length - i;
        const selectIndex = Math.floor(numRange * Math.random());
        const selectNum = idArr.splice(selectIndex, 1)[0];
        randIdArr[i] = selectNum;
    }

    return randIdArr;//[4, 2, 5...] non zero
}