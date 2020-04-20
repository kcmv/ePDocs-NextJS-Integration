const Department = require('../models/departments');

const getDepartments = async () => {
  try {
    const result = await Department.findAndCountAll();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createDepartments = async (department_name) => {
  try {
    const result = await Department.findOrCreate({
      where: { department_name },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateDepartments = async (uuid, department_name) => {
  try {
    const result = await Department.update(
      {
        department_name: department_name,
      },
      { returning: true, where: { uuid } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteDepartments = async (uuid) => {
  try {
    const result = await Department.destroy({
      where: { uuid },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getDepartments,
  createDepartments,
  updateDepartments,
  deleteDepartments,
};
