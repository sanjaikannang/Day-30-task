import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
    },
    phone: '',
    company: {
      name: '',
    },
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...newUser });

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddUser = () => {
    axios.post(apiUrl, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({
          name: '',
          email: '',
          address: {
            street: '',
            city: '',
            zipcode: '',
          },
          phone: '',
          company: {
            name: '',
          },
        });
      })
      .catch((error) => console.error(error));
  };

  const handleEditUser = () => {
    axios.put(`${apiUrl}/${editUserId}`, editedUser)
    .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === editUserId ? editedUser : user
        );
        setUsers(updatedUsers);
        setEditUserId(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="user-form">
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street"
          value={newUser.address.street}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              address: { ...newUser.address, street: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              address: { ...newUser.address, city: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={newUser.address.zipcode}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              address: { ...newUser.address, zipcode: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={newUser.company.name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              company: { ...newUser.company, name: e.target.value },
            })
          }
        />
        <button className='add-button' onClick={handleAddUser}>Add</button>
      </div>

      <h2>Users Data</h2>
      <div className="user-list">
      {users.map((user) => (
  <div key={user.id} className="user-card">
            {editUserId === user.id ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Street"
                  value={editedUser.address.street}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      address: { ...editedUser.address, street: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="City"
                  value={editedUser.address.city}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      address: { ...editedUser.address, city: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Zipcode"
                  value={editedUser.address.zipcode}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      address: { ...editedUser.address, zipcode: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={editedUser.company.name}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      company: { ...editedUser.company, name: e.target.value },
                    })
                  }
                />
                <button className='save-button' onClick={handleEditUser}>Save</button>
              </>
            ) : (
              <>
                <div>
                  <span>Name -</span> {user.name}
                </div>
                <div>
                  <span>Email - </span> {user.email}
                </div>
                <div>
                  <span>Address - </span> {user.address.street}, {user.address.city}, {user.address.zipcode}
                </div>
                <div>
                  <span>Phone - </span> {user.phone}
                </div>
                <div>
                  <span>Company - </span> {user.company.name}
                </div>
                <div className="button-container">
                  <button className='edit-button' onClick={() => setEditUserId(user.id)}>Edit</button>
                  <button className='delete-button' onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
