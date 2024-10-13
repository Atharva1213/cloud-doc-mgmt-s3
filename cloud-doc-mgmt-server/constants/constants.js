exports.PORT = process.env.PORT;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
exports.AWS_REGION = process.env.AWS_REGION;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CLIENTPARAMS = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

exports.NODE_ENV = process.env.NODE_ENV;
exports.CLUSTERURLS = [
  process.env.PRODDB1,
  process.env.PRODDB2,
  process.env.PRODDB3,
];

exports.CLUSTERURL = [
  process.env.PRODD1,
  process.env.PRODD2,
  process.env.PRODD3,
];

exports.TESTDB1 = process.env.TESTDB1;
