import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import dateFormat from 'dateformat';
import path from 'path';

const pathKey = path.resolve('./serviceaccountkey.json')

// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
  projectId: 'c-23-pc596-pantura',
  keyFilename: pathKey,
});

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = 'pantura-bucket';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

const ImgUpload = {};

ImgUpload.uploadToGcs = (file, callback) => {
  if (!file) {
    callback(new Error('No file provided'));
    return;
  }

  const gcsname = dateFormat(new Date(), 'yyyymmdd-HHMMss');
  const fileUpload = bucket.file(gcsname);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on('error', (err) => {
    callback(err);
  });

  stream.on('finish', () => {
    const imageUrl = getPublicUrl(gcsname);
    callback(null, imageUrl);
  });

  stream.end(file.buffer);
};

export default ImgUpload;
