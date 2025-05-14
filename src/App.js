import React, { useState } from "react";

const contactsData = [
  { id: 1, name: "Anjali" },
  { id: 2, name: "Ravi" },
  { id: 3, name: "Neha" },
  { id: 4, name: "Amit" }
];

const App = () => {
  const [selectedContact, setSelectedContact] = useState(contactsData[0]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => {
      const updated = { ...prev };
      updated[selectedContact.id] = [
        ...(updated[selectedContact.id] || []),
        { sender: "You", text: newMessage }
      ];
      return updated;
    });
    setNewMessage("");
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`p-2 rounded cursor-pointer mb-2 hover:bg-gray-300 ${
              selectedContact.id === contact.id ? "bg-gray-300" : ""
            }`}
          >
            {contact.name}
          </div>
        ))}
      </div>

      <div className="w-3/4 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">
          Chat with {selectedContact.name}
        </h2>
        <div className="flex-1 overflow-y-auto border p-4 rounded mb-4 bg-white">
          {(messages[selectedContact.id] || []).map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;