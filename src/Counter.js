import {useRecoilState} from 'recoil';
import {counterState} from './data/data'

function Counter(){
  const [count, setCount] = useRecoilState(counterState);
  const inc = () => {setCount(count + 1)}
    return (
        <div>
        <button onClick={inc}>증가</button>
         num : {count}
        </div>
      );
}

export default Counter;