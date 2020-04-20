const Sequelize = require("sequelize")
const db = require("../config/database")

const Documents = db.define("document", {
  // attributes
  document_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  site: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hmo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  program: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  urgent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Documents
