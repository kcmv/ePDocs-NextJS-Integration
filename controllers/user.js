const User = require('../models/users');
const Event = require('../models/event');
const lib = require('../libraries/lib');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const isUserRegistered = async (email) => {
  try {
    let isUserRegistered = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { employee_no: email }],
      },
    });
    return isUserRegistered;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePassword = async (email, password) => {
  try {
    const result = await User.update(
      {
        password: bcrypt.hashSync(password, saltRounds),
      },
      { returning: true, where: { email } }
    );
    return result[1];
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (user, password) => {
  const { email, employee_no, branch, department, hmo_plan } = user;

  let branch_arr = [];
  branch.map((item, key) => {
    branch_arr.push(item.branch_name);
  });

  try {
    const create_user = await User.create({
      email,
      password,
      user_role: 2,
      employee_no,
      branch: branch_arr.toString(),
      department,
      hmo_plan,
    });
    return create_user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async () => {
  try {
    const result = await User.findAndCountAll({
      include: [
        {
          model: Event,
          all: true,
        },
      ],
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createUserLocal = async (user) => {
  const { employee_no, email, password, branch, department, hmo_plan } = user;
  try {
    const result = await User.findOrCreate({
      where: {
        [Op.or]: [{ email: email }, { employee_no: employee_no }],
      },
      defaults: {
        email,
        employee_no,
        password,
        branch,
        department,
        hmo_plan,
        user_role: 2,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (uuid, email, password, user_role) => {
  try {
    const result = await User.update(
      {
        email,
        password: lib.generateHash(password),
        user_role,
      },
      { returning: true, where: { uuid } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createUserType = async (user_role) => {
  try {
    const result = await User_type.findOrCreate({
      where: { user_role },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  isUserRegistered,
  updatePassword,
  createUserLocal,
  createUserType,
  createUser,
  updateUser,
  getUsers,
};
