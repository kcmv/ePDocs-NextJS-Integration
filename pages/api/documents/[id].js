const DocumentController = require('../../../controllers/documents');

export default async (req, res) => {
  const {
    query: { id },
  } = req;
  if (req.method === 'PUT') {
    res.status(200).send(`Update document id ${id}`);
  } else {
    const split_arr = id.split(',');
    const docs = await DocumentController.getDocuments(
      split_arr[0],
      split_arr[1],
      split_arr[2]
    );
    res.status(200).json(docs);
  }
};
