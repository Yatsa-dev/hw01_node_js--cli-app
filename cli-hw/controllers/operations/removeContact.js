const path = require('path');
const fs = require('fs/promises');
const readContent = require('./readContent');

// const removeContact = async (contactId) => {
//   const contacts = await readContent();
//   let deleteContacts = null;
//   const result = contacts.filter((contact) => contact.id !== contactId);
//   return true;
//   deleteContacts = contact;
//   return false;
//   await fs.writeFile(
//     path.join(__dirname, '..', '..', 'db', 'contacts.json'),
//     JSON.stringify(result, null, 2)
//   );
//   return result;
// };

const removeContact = async (contactId) => {
  try {
    const contacts = await readContent();
    let deleteContact = null;
    const result = contacts.filter((contact) => {
      if (contact.id !== contactId) {
        return true;
      }
      deleteContact = contact;
      return false;
    });

    fs.writeFile(
      path.join(__dirname, '..', '..', 'db', 'contacts.json'),
      JSON.stringify(result, null, 2)
    );
    return deleteContact;
  } catch (error) {
    console.log(error);
  }
};
module.exports = removeContact;
