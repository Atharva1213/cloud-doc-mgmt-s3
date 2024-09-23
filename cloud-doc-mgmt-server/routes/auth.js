const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../Modal/user_table');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

// Protected Route API
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userEmail: req.userEmail });
});
// Login Check Route API
router.get('/user_login', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userEmail: req.userEmail });
});
// get_user_data API
router.post('/user_data', authMiddleware, async (req, res) => {
  const { userEmail } = req.body;
  try {
    if (!userEmail) {
      return res.status(402).json({ message: 'Username is Required.' });
    }
    const user = await User.findOne({ userEmail }).sort({
      'documents.uploadDate': -1,
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User Is Not Register..PLZ Register' });
    }
    res.json({ documents: user.documents });
  } catch (error) {
    res.status(500).json({ message: 'Server Internal error' });
  }
});
// Login API
router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    if (!userEmail || !userPassword) {
      return res
        .status(402)
        .json({ message: 'UserEmail And Password is Required.' });
    }
    const user = await User.findOne({ userEmail: userEmail.toLowerCase() });
    if (!user) {
      return res.status(402).json({ message: 'Invalid login details!' });
    }

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(402).json({ message: 'Invalid login details!' });
    }

    const token = jwt.sign({ userEmail: user.userEmail }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, userEmail: user.userEmail });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});
// Registration API
router.post('/register', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(402).json({
      message: 'All fields are required(userEmail,userPassword)',
    });
  }

  try {
    const existingUser = await User.findOne({
      userEmail: userEmail.toLowerCase(),
    });
    if (existingUser) {
      return res.status(402).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      userEmail: userEmail.toLowerCase(),
      userPassword: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: 'User Registered Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});
// Uploading Document API
router.post(
  '/upload_document',
  upload.any(),
  authMiddleware,
  async (req, res) => {
    const { userEmail, documentType, documentName, documentDescription } =
      req.body;
    const uploadFiles = req.files;

    try {
      if (!uploadFiles || uploadFiles.length === 0) {
        return res.status(402).json({ message: 'No file is uploaded.' });
      }

      if (
        !userEmail ||
        !documentType ||
        !documentName ||
        !documentDescription
      ) {
        return res.status(402).json({
          message:
            'All fields are required (userEmail, documentType, documentName, documentDescription).',
        });
      }

      const documentFile = uploadFiles[0];
      const user = await User.findOne({ userEmail });

      if (!user) {
        return res
          .status(402)
          .json({ message: 'User not registered. Please register.' });
      }

      const documentExists = user.documents.some(
        (doc) => doc.documentName === documentName
      );
      if (documentExists) {
        return res.status(402).json({
          message:
            'Document name already exists for this user. Please choose another name.',
        });
      }

      const uniqueFilename = `${Date.now()}-${documentFile.originalname}`;
      const documentLink = `uploads/${uniqueFilename}`;

      const newDocument = {
        documentType,
        documentName,
        documentLink,
        documentDescription,
        uploadDate: Date.now(),
      };
      user.documents.push(newDocument);
      await user.save();

      res.json({ message: 'Document uploaded successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);
// Delete Document API
router.post('/delete_document', authMiddleware, async (req, res) => {
  const { userEmail, documentName } = req.body;
  try {
    if (!userEmail || !documentName) {
      return res
        .status(402)
        .json({
          message: 'All fields are required (userEmail, documentName).',
        });
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const updatedDocuments = user.documents.filter(
      (doc) => doc.documentName !== documentName
    );

    if (user.documents.length === updatedDocuments.length) {
      return res.status(402).json({ message: 'Document not found.' });
    }

    user.documents = updatedDocuments;

    await user.save();

    res.json({ message: 'Document deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});
// Updating Document API
router.post('/update_document', authMiddleware, async (req, res) => {
  const { userEmail, documentName, documentType, documentDescription } =
    req.body;

  try {
    if (!userEmail || !documentName || !documentType || !documentDescription) {
      return res.status(402).json({
        message:
          'All fields are required (userEmail, documentName, documentType, documentDescription).',
      });
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const documentToUpdate = user.documents.find(
      (doc) => doc.documentName === documentName
    );

    if (!documentToUpdate) {
      return res.status(402).json({ message: 'Document not found.' });
    }

    documentToUpdate.documentType = documentType;
    documentToUpdate.documentDescription = documentDescription;

    await user.save();

    res.json({ message: 'Document updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
