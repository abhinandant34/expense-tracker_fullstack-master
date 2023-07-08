const TransactionSchema= require("../models/TransactionModel")

exports.addTransaction = async (req, res) => {
    const {title, amount,type,  description, date}  = req.body

    const transaction = TransactionSchema({
        title,
        amount,
        type,
        description,
        date
    })

    try {
        //validations
        if(!title  || !description || !date || !type){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await transaction.save()
        res.status(200).json({message: 'Transaction Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(transaction)
}


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
    console.log(searchParams.date );
  }

  try {
    let transactions;
    if (Object.keys(searchParams).length === 0) {
      transactions = await TransactionSchema.find().sort({ createdAt: -1 });
    } else {
      transactions = await TransactionSchema.find(searchParams).sort({ createdAt: -1 });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.log("the error message: " + error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getallTransactions = async (req, res) =>{
    try {
        const transactions = await TransactionSchema.find().sort({createdAt: -1})
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteTranaction = async (req, res) =>{
    const {id} = req.params;
    TransactionSchema.findByIdAndDelete(id)
        .then((transaction) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}