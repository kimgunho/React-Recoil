import {counterState} from './data/data'
import {useRecoilValue} from 'recoil'

function ReadCounter(){
    const value = useRecoilValue(counterState)
    return <>renum : {value}</>
}

export default ReadCounter;