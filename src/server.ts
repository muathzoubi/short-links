const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://optionsalone4:hgvleH@123@cluster0.ixd2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));

// Link Schema
const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, default: shortid.generate },
});

const Link = mongoose.model('Link', linkSchema);

// POST - Create a new short link
app.post('/api/shorten', async (req: any, res: any) => {
  const { originalUrl } = req.body;

  // Check if URL is provided
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    const newLink = new Link({ originalUrl });
    await newLink.save();
    res.json({ shortUrl: `${req.headers.host}/${newLink.shortId}` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Redirect to the original URL
app.get('/:shortId', async (req: any, res: any) => {
  const { shortId } = req.params;

  try {
    const link = await Link.findOne({ shortId });
    if (link) {
      res.redirect(link.originalUrl);
    } else {
      res.status(404).json({ error: 'Link not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = 4001 || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
