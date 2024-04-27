import styles from "./styles.module.css";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const [newRoomName, setNewRoomName] = useState(""); // State untuk nama room baru
  const [roomPassword, setRoomPassword] = useState("");
  const [existingRooms, setExistingRooms] = useState([]); // State untuk daftar room yang sudah ada

  useEffect(() => {
    // Listen for existing rooms from the server
    socket.on("existing_rooms", (rooms) => {
      setExistingRooms(rooms);
    });

    // Cleanup the event listener
    return () => {
      socket.off("existing_rooms");
    };
  }, [socket]);

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    // Redirect to /chat
    navigate("/chat", { replace: true });
  };

  // Emit event to create a new room
  const createNewRoom = () => {
    if (newRoomName !== "") {
      socket.emit("create_room", newRoomName);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat Me`}</h1>
        <input
          className={styles.input}
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Menampilkan daftar room yang sudah ada */}
        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        >
          <option value=''>-- Select Room --</option>
          {existingRooms.map((roomName) => (
            <option key={roomName} value={roomName}>
              {roomName}
            </option>
          ))}
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>

        <input
          className={styles.input}
          placeholder='New Room...'
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder='New Room Password...'
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
        />

        <button
          className='btn btn-primary'
          style={{ width: "100%", marginTop: "10px" }}
          onClick={createNewRoom}
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};

export default Home;
