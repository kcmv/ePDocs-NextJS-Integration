import bcrypt from 'bcrypt';
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require('@azure/storage-blob');

const account = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = process.env.containerName;

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const appendBlobName = (name) => {
  return `https://${account}.blob.core.windows.net/` + 'ep-assets' + '/' + name;
};
const saltRounds = 10;

const generateHash = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const uploadBlobToAzure = async (file) => {
  try {
    // Get container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get file path
    const content = file.document.path;

    // Get file name
    const blobName = file.document.name;

    // Get container blob function
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Set content type
    const blobOptions = {
      blobHTTPHeaders: { blobContentType: 'application/pdf' },
    };

    // Upload file
    const uploadBlobResponse = await blockBlobClient.uploadFile(
      content,
      blobOptions
    );
    // console.log(
    //   `Upload block blob ${blobName} successfully`,
    //   uploadBlobResponse.requestId
    // );
    if (uploadBlobResponse.requestId) {
      return {
        id: uploadBlobResponse.requestId,
        append: appendBlobName,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  generateHash,
  uploadBlobToAzure,
};
