import Counter from "./Counter";
import ReadCounter from "./ReadCounter";
import SetCounter from './SetCounter'
import SecondStata from "./SecondUseState";

function App() {
  return (
      <div className="App">
        <Counter />
        <ReadCounter />
        <SetCounter />
        <SecondStata />
      </div>
  );
}

export default App;
