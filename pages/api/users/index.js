const UserController = require('../../../controllers/user');

export default async (req, res) => {
  if (req.method === 'POST') {
  } else {
    const result = await UserController.getUsers();
    if (!result) {
      res.status(404).send('Users not found');
    }
    res.status(200).json(result);
  }
};
