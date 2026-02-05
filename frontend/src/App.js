import { useState, useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingContactId, setEditingContactId] = useState(null);

  // LOAD CONTACTS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contacts/")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  // CREATE / UPDATE
  function handleSubmit() {
    if (!name || !email || !phone) return;

    // UPDATE
    if (editingContactId) {
      fetch(`http://127.0.0.1:8000/api/contacts/${editingContactId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      })
        .then((res) => res.json())
        .then((updated) => {
          setContacts(
            contacts.map((c) => (c.id === updated.id ? updated : c))
          );
          resetForm();
        });
      return;
    }

    // CREATE
    fetch("http://127.0.0.1:8000/api/contacts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts([...contacts, data]);
        resetForm();
      });
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setEditingContactId(null);
  }

  function startEdit(contact) {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setEditingContactId(contact.id);
  }

  function deleteContact(id) {
    fetch(`http://127.0.0.1:8000/api/contacts/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setContacts(contacts.filter((c) => c.id !== id));
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          Contact List
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Total contacts: {contacts.length}
        </p>

        {/* FORM */}
        <div
          className={`border-2 rounded-lg p-4 mb-6 ${
            editingContactId ? "border-blue-500" : "border-gray-200"
          }`}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-gray-700 transition"
          >
            {editingContactId ? "Update Contact" : "Add Contact"}
          </button>

          {editingContactId && (
            <button
              onClick={resetForm}
              className="w-full mt-2 text-sm text-gray-500 hover:underline"
            >
              Cancel editing
            </button>
          )}
        </div>

        {/* CONTACT LIST */}
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <p className="font-semibold text-lg">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>

              <div className="flex justify-end gap-4 mt-3">
                <button
                  onClick={() => startEdit(contact)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
