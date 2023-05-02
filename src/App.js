import logo from "./logo.svg";
import "./App.css";
import ListTodo from "./Component/ListTodo";


function App() {
  return (
    <div className="outermost">
      <ListTodo/>
      {/* <FComment author="lux" time="today at 6:00" content="very good" />
      <FComment author="luka" time="today at 7:00" content="very bad"/> */}
    </div>
  );
}

export default App;
