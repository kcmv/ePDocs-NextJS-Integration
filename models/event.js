const Sequelize = require("sequelize")
const db = require("../config/database")

const Event = db.define("event", {
  // attributes
  event_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  document_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Event
