const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db", "contacts.json");
console.log(contactsPath);

function listContacts() {
  fs.readFile(contactsPath, "utf8").then((data) => {
    console.table(JSON.parse(data.toString()));
  });
}

// listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8").then((data) => {
    console.table(
      JSON.parse(data.toString()).filter((contact) => contact.id === contactId)
    );
  });
}
// getContactById(6);

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
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
removeContact(1);

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8").then((data) => {
    const result = JSON.parse(data.toString()).push({ name, email, phone });
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
