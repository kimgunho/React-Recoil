import {useRecoilValue} from 'recoil'

import {numberValue} from './data/data'

function Selector(){
    const value =  useRecoilValue(numberValue)
    return <div>{value}</div>
}

export default Selector