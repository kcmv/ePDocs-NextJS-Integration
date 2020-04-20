const Sequelize = require('sequelize');
const Documents = require('../models/documents');
const lib = require('../libraries/lib');

const getDocuments = async (department, hmo_plan, site) => {
  try {
    const result = await Documents.findAndCountAll({
      where: {
        program: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('program')),
          'LIKE',
          '%' + department + '%'
        ),
        hmo: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('hmo')),
          'LIKE',
          '%' + hmo_plan + '%'
        ),
        site: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('site')),
          'LIKE',
          '%' + site + '%'
        ),
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllDocuments = async () => {
  try {
    const result = await Documents.findAndCountAll();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createDocument = async (fields, file) => {
  const { urgent, hmo, program, site, name, type } = fields;

  const result = await lib.uploadBlobToAzure(file);

  if (!result.id) {
    return 'Something went wrong. Check kudu logs for more details.';
  }

  try {
    const new_docs = await Documents.findOrCreate({
      where: { name: name, hmo: hmo },
      defaults: {
        link: result.append(file.document.name),
        urgent: Boolean(urgent),
        // hmo: hmo,
        program: program,
        site: site,
        type: type,
      },
    });
    return new_docs;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getDocuments,
  createDocument,
  getAllDocuments,
};
