const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  } catch (error) {
    console.log(error);
  }
}

// listContacts();

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.table(parsedData.find((contact) => contact.id === contactId));
  } catch (error) {
    console.log(error);
  }
}
// getContactById();

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

// removeContact(11);

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

// addContact("gdsfjf", "dasbdgSJK", "34567890");
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
