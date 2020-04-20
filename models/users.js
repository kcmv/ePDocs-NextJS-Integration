const Sequelize = require("sequelize")
const db = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10
const User_type = require("../models/user_type")

const User = db.define(
  "user",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    employee_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hmo_plan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "User_types",
        key: "id",
      },
    },
  },
  {
    // options
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, saltRounds)
              : //? user.password
                ""
        }
      },
    },
  }
)

// var generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// }

// User.generateAuthToken = async function() {
//   // Generate an auth token for the user
//   const user = this;
//   const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// User.findByCredentials = async function(email, password) {
//   // Search for a user by email and password.
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) {
//     throw new Error({ error: "Invalid login credentials" });
//   }
//   return user;
// };

User.belongsTo(User_type, { foreignKey: "user_role" })
module.exports = User
