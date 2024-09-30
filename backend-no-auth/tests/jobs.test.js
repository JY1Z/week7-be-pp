const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); 
const api = supertest(app);
const Job = require("../models/jobModel"); 

const jobs = [
  {
    title: '111',
    type: '111',
    description: '111',
    company: {
      name: '111',
      contactEmail: '111@x.com',
      contactPhone: '111'
    }
  },
  {
    title: '222',
    type: '222',
    description: '222',
    company: {
      name: '222',
      contactEmail: '222@x.com',
      contactPhone: '222'
    }
  },
];

describe("Job Controller", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/jobs
  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
  });

  // Test POST /api/jobs
  it("should create a new Job when POST /api/jobs is called", async () => {
    const newJob = {
      title: '333',
      type: '333',
      description: '333',
      company: {
        name: '333',
        contactEmail: '333@x.com',
        contactPhone: '333'
      }
    };

    await api
      .post("/api/jobs")
      .send(newJob)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const jobsAfterPost = await Job.find({}); 
    expect(jobsAfterPost).toHaveLength(jobs.length + 1);

    const jobTitles = jobsAfterPost.map((Job) => Job.title); 
    expect(jobTitles).toContain(newJob.title);
  });

  // Test GET /api/jobs/:id
  it("should return one Job by ID when GET /api/jobs/:id is called", async () => {
    const existingJob = await Job.findOne(); 
    await api
      .get(`/api/jobs/${existingJob._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing Job ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/jobs/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/jobs/:id
  it("should update one Job with partial data when PUT /api/jobs/:id is called", async () => {
    const existingJob = await Job.findOne();
    const updatedJob = {
      title: "Updated title",
      description: "Updated description",
    };

    await api
      .put(`/api/jobs/${existingJob._id}`)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedJobCheck = await Job.findById(existingJob._id);
    expect(updatedJobCheck.description).toBe(updatedJob.description);
    expect(updatedJobCheck.title).toBe(updatedJob.title);
  });

  it("should return 400 for invalid Job ID when PUT /api/jobs/:id", async () => {
    const invalidId = "12345"; 
    await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/jobs/:id
  it("should delete one Job by ID when DELETE /api/jobs/:id is called", async () => {
    const existingJob = await Job.findOne();
    await api.delete(`/api/jobs/${existingJob._id}`).expect(204);

    const deletedJobCheck = await Job.findById(existingJob._id);
    expect(deletedJobCheck).toBeNull(); 
  });

  it("should return 400 for invalid Job ID when DELETE /api/jobs/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/jobs/${invalidId}`).expect(400);
  });
});
