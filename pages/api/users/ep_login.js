const UserController = require('../../../controllers/user');
const service = require('../../../services/service');
const bcrypt = require('bcrypt');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // Check ePLife login
    let user = await service.checkEpLifeAccount(email, password);

    if (user.success) {
      const result = await UserController.isUserRegistered(email);
      if (result === null) {
        // Register user
        const profile = await service.getUserProfile(user.data.session_code);
        const new_user = await UserController.createUser(
          profile,
          req.body.password
        );
        res.status(200).send(new_user);
      } else {
        const { password } = result.dataValues;
        const isPasswordMatch = await bcrypt.compare(
          req.body.password,
          password
        );

        if (isPasswordMatch) {
          // Send user profile
          res.status(200).json(result);
        } else {
          // Update password
          const isPasswordChange = await UserController.updatePassword(
            email,
            req.body.password
          );
          if (isPasswordChange) {
            res.status(200).json(result);
          }
        }
      }
    } else {
      res.status(404).json(user);
    }
  }
};
