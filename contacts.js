const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db", "contacts.json");
// console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const contact = parsedData.find((contact) => contact.id === contactId);
    if (!contact) {
      console.log(`Contact with id=${contactId} not found`);
      return;
    }
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredData));
    console.table(filteredData);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const id =
      parsedData.reduce(
        (accum, item) => (accum > item.id ? accum : item.id),
        0
      ) + 1;
    parsedData.push({ id, name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
    console.table(parsedData);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
