import {atom, selector, useRecoilState} from 'recoil';

const userState = atom({
  key: 'user',
  default: {
    firstName: 'Gildong',
    lastName: 'Hong',
    age: 30
  }
});

const userNameSelector = selector({
  key: 'userName',
  get: ({get}) => {
    const user = get(userState);
    return user.firstName +  ' ' + user.lastName;
  },
  set: ({set}, name) => {
    const names = name.split(' ');
    set(
      userState,
      (prevState) => ({
        ...prevState,
        firstName: names[0],
        lastName: names[1] || ''
      })
    );
  }
});

function User() {
  const [userName, setUserName] = useRecoilState(userNameSelector);
  const inputHandler = (event) => {
      console.log(userName)
      setUserName(event.target.value)      
  };

  return (
    <div>
      Full name: {userName}
      <br />
      <input type="text" onInput={inputHandler} />
    </div>
  );
}

export default User;