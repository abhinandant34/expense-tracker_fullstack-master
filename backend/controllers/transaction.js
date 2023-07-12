const TransactionSchema = require("../models/TransactionModel");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

exports.uploadFile = async (req, res) => {
  try {
    // Handle the uploaded file using multer middleware
    upload.single("file")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during file upload
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        // An unknown error occurred during file upload
        return res.status(500).json({ message: "Server error" });
      }

      // File upload was successful
      if (!req.file) {
        // No file was uploaded
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Access the uploaded file information
      const file = req.file;
      try {
        // Read the Excel file
        const workbook = XLSX.readFile(file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log("the data is " ,jsonData)

        // Process and upload the extracted data to the database
        const transactions = jsonData.map((data) => {
          const { title, amount, type, date , description } = data;

          

          // Create a new transaction object
          const transaction = new TransactionSchema({
            title,
            amount,
            type,
            description,
            date,
          });

          return transaction;
        });
        console.log(transactions);

        // Save the transactions to the database
        await TransactionSchema.insertMany(transactions);

        // Delete the uploaded file
        fs.unlinkSync(file.path);

        res.status(200).json({ message: "File data uploaded successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error processing file data" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTransaction = async (req, res) => {
  const { title, amount, type, description, date } = req.body;

  const transaction = TransactionSchema({
    title,
    amount,
    type,
    description,
    date,
  });

  try {
    // validations
    if (!title || !date || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // if (amount <= 0 || typeof amount !== "number") {
    //   return res
    //     .status(400)
    //     .json({ message: "Amount must be a positive number!" });
    // }
    await transaction.save();
    res.status(200).json({ message: "Transaction Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(transaction);
};

exports.getTransactions = async (req, res) => {
  const { title, amount, description, type, date } = req.body; // Destructure the values from req.body

  let searchParams = {};

  if (title) {
    searchParams.title = title;
  }

  if (amount) {
    searchParams.amount = amount;
  }

  if (description) {
    searchParams.description = description;
  }

  if (type) {
    searchParams.type = type;
  }

  if (date) {
    searchParams.date = date.concat("T18:30:00.000+00:00");
    console.log(searchParams.date);
  }

  try {
    let transactions;
    if (Object.keys(searchParams).length === 0) {
      transactions = await TransactionSchema.find().sort({ createdAt: -1 });
    } else {
      transactions = await TransactionSchema.find(searchParams).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.log("the error message: " + error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getallTransactions = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTranaction = async (req, res) => {
  const { id } = req.params;
  TransactionSchema.findByIdAndDelete(id)
    .then((transaction) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
