import "./App.css";
import Users from "./Users";
import Messages from "./Messages";
import TextInput from "./TextInput";
import userData from "./Dummy_Data/userData";

function App() {
  return (
    <div className="App">
      <Users userNames={userNames(userData)} />
      <Messages />
      <TextInput />
    </div>
  );
}

const userNames = (userData) => {
  let names = [];
  userData.forEach((user) => names.push(user.name));
  return names;
};

export default App;
