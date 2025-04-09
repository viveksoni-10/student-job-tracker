const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://myuser:database123456789@cluster0.ckih7gv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Job Schema
const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date: String,
  link: String,
});

const Job = mongoose.model('Job', jobSchema);

// Routes
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

app.put('/api/jobs/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});

app.delete('/api/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));