const Sequelize = require("sequelize")
const db = require("../config/database")

const Department = db.define("department", {
  // attributes
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  department_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Department
