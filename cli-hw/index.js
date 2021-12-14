const chalk = require('chalk');
const { Command } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./controllers/operations');

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      contactById
        ? console.log(
            chalk.green(
              `Contact found: ${contactById.name} ${contactById.phone} ${contactById.email}`
            )
          )
        : console.log(chalk.yellow('Contact not found'));
      break;

    case 'add':
      const contact = await addContact(name, email, phone);
      console.log(chalk.green('Add contact'));
      console.log(contact);
      break;

    case 'remove':
      const removeById = await removeContact(id);
      removeById
        ? console.log(chalk.green(`Contact with id: ${id} remove`))
        : console.log(chalk.red(`Contact with id: ${id} not found`));
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
};
(async () => {
  await invokeAction(argv);
  console.log(chalk.bgGreen('Operations success'));
})();
