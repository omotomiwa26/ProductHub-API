const Book = require('../models/productsModel');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, owner: req.user.userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all books with optional filtering
exports.listAllBooks = async (req, res) => {
  const { genre, author, rating } = req.query;
  const query = {};

  if (genre) query.genre = genre;
  if (author) query.author = author;
  if (rating) query.rating = { $gte: rating };

  try {
    const books = await Book.find(query).where('owner').equals(req.user.userId);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List a single book by ID
exports.listBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Book Not Found' });
    }

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Book Not found' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: `Book '${book.title}' Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
