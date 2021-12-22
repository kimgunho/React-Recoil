import {useSetRecoilState, useRecoilValue} from 'recoil'
import {counterState} from './data/data'

function SetCounter(){
    const count = useRecoilValue(counterState)
    const setCount = useSetRecoilState(counterState)
    const minus = () => {setCount(count - 1)}

    return <button onClick={minus}>마이너스</button>
}

export default SetCounter