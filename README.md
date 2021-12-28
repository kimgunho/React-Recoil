# 리엑트 Recoil 연습

리엑트 Recoil 연습을 위한 테스트 입니다.

리코일은 페이스북에서 제공한 **리엑트만의 전용 상태관리** 툴로서 제공된 라이브러리입니다.
사실 FE관련 공부를 하면서 redux나 Mobx를 먼저 공부할 단계였지만
페이스북에서 직접 리엑트만을 위한 전용 상태관리라는 슬로건에 매료되어
context 이후 recoil을 알아보게 되었습니다.

그래서 아직 모르는게 많으니 이것저것 실험해보며 알아가도록 하겠습니다.

## 기본 개념

리코일은 context의 기반에서 시작되었다고 합니다.
그래서 비슷한 부분도 존재하고 있습니다.
context에서는 Provider를 최상위에 감싸주어 상태를 다루는 범위를 지정해줍니다.

리코일에서도 같은 개념인 recoilRoot를 사용하여 상태를 주고받은 컴포넌트 최상단에 감싸줍니다.

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil'; // recoil 설치후 임폴트


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot> // 감싸줍니다.
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
```

이후 제공해주는 레퍼런스를 하나하나씩 사용해보겠습니다.

## 기본 사용법 atom, useRecoilState

아톰은 해석하면 원자입니다. 스스로 이해한 개념으로 해석하자면
원자단위의 작은 조각처럼 작은 상태를 지정하는 부분부터 리코일의 시작이라 생각하며
원자(상태)의 선언이라 생각합니다.

사용법을 보면

1. 상태관리를 위한 파일을 만들어줍니다.

```
// data/data.js

import { atom } from 'recoil'; // 아톰을 사용하기위한 임폴트

export const counterState = atom({
    key: 'counterState',
    default: 0
});
```

아톰은 항상 키과 디폴트값으로 이루어집니다.
디폴트값에는 배열, 객체, 여러 값들이 존재가능합니다.

2. 사용할 컴포넌트를 불러옵니다.

```
// Counter. js
import {useRecoilState} from 'recoil'; // 리엑트의 useState와 매우 흡사합니다.
import {counterState} from './data/data' // 저장된 상태파일을 불러옵니다.

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
```

처음 아톰으로 상태에 대한 값을 키와 디폴트로 분류하여 저장합니다.
저는 data라는 폴더를 만든 후 data.js파일안에 counterState라는 상태를 선언 후 export하였습니다.

선언된 상태를 사용하기 원하는 컴포넌트에 불러와 get, set을 함께 하기위하여
useRecoilState를 임폴트합니다. useRecoilState는 매우매우 리엑트의 useState와 개념이 비슷합니다. 그래서 익숙한거같습니다.

count와 setCount를 선언한 후 useRecoilState를 함께 적용합니다.
저같은 경우는 증가함수를 만든 후 일반적으로 사용되는 useState처럼 활용해보았습니다.
확인결과 작동이 잘되었습니다.

여기까지 진행해본후 든 의문은 상태만을 불러오는 부분이 존재하는가였는데
역시나 존재합니다.

## 상태만을 불러오는 useRecoilValue, 수정만을 불러오는 useSetRecoilValue

useRecoilState는 상태의 값을 사용하며 재설정을 해줍니다.
하지만 상태를 불러오기만 혹은 수정하기만 한다면
다른 제공함수를 사용합니다.

### 읽기전용 상태 - useRecoilValue

위 코드에서 useRecoilState를 활용하여 데이터의 counterState 값을 수정과 읽기를 함께하였습니다. 만약 다른 컴포넌트에서 해당 데이터를 불러오는것만 목적이라면
**useRecoilValue**를 사용합니다.

```
// 다른 컴포넌트
import {useStateValue} from 'recoil'
import {counterState} from './data/data.js'

functon OnlyRead(){
    const value = uesStateValue(counterState)
    return {value}
}
```

### 수정전용 - useSetRecoilValue

상태를 읽기않고 수정만을 원한다면 **useSetRecoilValue**를 사용할 수 있습니다.

```
// setCounter.js
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {counterState} from './data/data'

function SetCounter(){
    const count = useRecoilValue(counterState) // useRecoilValue로 수정할 데이터 지정
    const setCount = useSetRecoilState(counterState) // 수정할 상태 설정
    const minus = () => {setCount(count - 1)} // 수정함수

    return <button onClick={minus}>마이너스</button>
}

```

읽기전용과 수정 전용을 테스트해보며 의문이 들었다.
useSetRecoilValue과 useRecoilValue은 useRecoilState를 분리한 것같은데
그렇다면 useRecoilState를 다른 컴포넌트에서 같은 데이터를 수정할 수 있는지 의문이 들어 테스트해보았다.

SecondUseState 컴포넌트를 만들어 Counter과 똑같이 구성해보았다.

```
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
```

아마 count, setCount의 state는 겉치레일뿐이고 상태에 대한 결과값은 같은 구성인거같다.

## selector

리코일은 초기 상태값으로 아톰을 지원한다.
하지만 아톰의 상태를 사용하고 수정하려면 useRecoilState를 사용하여야한다. 이는 분명 좋은것이라 생각하고 아주 많이 활용될 것이라 생각하지만 셀렉터는 더욱 상태를 순수 함수화 하는 구조로 새로운 반환값을 리턴해주는 좋은 아톰과는 친구같은 존재? 로 느껴진다.
말이 이상한거 같아 코드로 하나하나씩 보며 해석해보는게 좋을듯하다.

```
import {atom, selector, useRecoilState} from 'recoil';


// userState라는 아톰에 first, last, age, 값을 설정했다.
const userState = atom({
  key: 'user',
  default: {
    firstName: 'kim',
    lastName: 'gunho',
    age: 20
  }
});


const userNameSelector = selector({
  key: 'userName',
  get: ({get}) => { // get함수는 useNameSelector를 불러오며 자동적으로 로직의 결과를 반환한다.
    const user = get(userState); // 위 userState의 데이터를 user 변수에 할당
    return user.firstName +  ' ' + user.lastName; // first + last 네임을 리턴한다. 단 중간에 ' '스페이스 공간을 띄운다.
  },
  set: ({set}, name) => { // name은 set 순수 함수가 사용될 때 적용할 매개변수이다.
    const names = name.split(' '); // 매개변수로 받은 네임을 ' '기준으로 배열화 시킨후 names에 할당한다.
    set( // 수정할것이다. 무엇을?
      userState, // 아톰 userState를
      (prevState) => ({ // 전데이터랑 비교하여
        ...prevState, // 전데이터를 유지하되
        firstName: names[0], // names[0]의 값을 userState의 first값으로 할당
        lastName: names[1] || '' // names[1]의 값을 last로 할당 이후 데이터는 '' 으로 적용
      })
    );
  }
});

function User() {
  const [userName, setUserName] = useRecoilState(userNameSelector);
  const inputHandler = (event) => setUserName(event.target.value);

  return (
    <div>
      Full name: {userName}
      <br />
      <input type="text" onInput={inputHandler} />
    </div>
  );
}
```

[공부참고 사이트 - 리코일 레시피 소개](https://taegon.kim/archives/10105)

## 기초 정리

Recoil의 기본사항은 윗 부분으로 정리되며 이후 selector를 활용한 비동기 제어부분은
2차로 정리하려합니다.

리코일과 Next.js을 새롭게 배운 후 함께 적용한 재미있는 프로젝트를 빨리 만들어보고싶은 생각이 듭니다.
