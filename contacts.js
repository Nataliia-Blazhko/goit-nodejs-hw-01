const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      console.table(JSON.parse(data.toString()));
    })
    .catch((error) => {
      console.log(error);
    });
}

// listContacts();

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data.toString());
    console.table(parsedData.find((contact) => contact.id === contactId));
  } catch (error) {
    console.log(error);
  }
}
// getContactById(2);

async function removeContact(contactId) {
  await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const result = JSON.parse(data.toString()).filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(result));
      console.table(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
removeContact(6);

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8").then((data) => {
    const result = JSON.parse(data.toString()).push({ name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(result));
    console.table(result);
  });
}

// addContact("gdsfjf", "dasbdgSJK", 34567890);
module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
