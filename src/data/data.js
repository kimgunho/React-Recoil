import { atom, selector } from 'recoil';
 
export const counterState = atom({
    key: 'counterState',
    default: 0
});

export const numberValue = selector({
    key: '',
    get: ({get}) => {
        const number = get(counterState)
        return number
    }
});
 