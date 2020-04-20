const DocumentController = require('../../../controllers/documents');
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const new_pdf = await DocumentController.createDocument(fields, files);
      if (!new_pdf) {
        res.status(500).send('Azure storage upload error.');
      }
      if (!new_pdf[1]) {
        res.status(403).send('Document already exists');
      }
      res.status(200).json(new_pdf[0]);
    });
  } else {
    const documents = await DocumentController.getAllDocuments();
    if (!documents.rows) {
      res.status(404).send('Documents not found.');
    }
    res.status(200).json(documents);
  }
};
