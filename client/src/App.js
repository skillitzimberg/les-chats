import "./App.css";
import Users from "./Users";
import Messages from "./Messages";
import TextInput from "./TextInput";
import userData from "./Dummy_Data/userData";

function App() {
  return (
    <div className="App">
      <Users userNames={userNames(userData)} />
      <Messages userData={userData} />
      <TextInput />
    </div>
  );
}

const userNames = (userData) =>
  userData.map((user) => {
    return user.name;
  });

export default App;
