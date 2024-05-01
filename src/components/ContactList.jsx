import { useState, useEffect } from "react";
import ContactRow from "./ContactRow";


const APIURL = "https://jsonplaceholder.typicode.com/users";

export default function ContactList({ selectedContactId, setSelectedContactId }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(APIURL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setContacts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchContacts();
  }, []);

  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {contacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            setSelectedContactId={setSelectedContactId}
          />
        ))}
      </tbody>
    </table>
  );
}