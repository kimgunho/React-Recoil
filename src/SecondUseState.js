import {useRecoilState} from 'recoil'
import {counterState} from './data/data'

function SecondStata(){
    const [count, setCount] = useRecoilState(counterState)

    const inc = () => {setCount(count + 1)}
    return (
        <>
            <div>num : {count}</div>
            <button onClick={inc}>증가 2번째</button>
        </>
    )
}

export default SecondStata;