import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import NewDeliveryMail from '../app/jobs/NewDeliveryMail';

const jobs = [NewDeliveryMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee
        .on('failed', this.handleFailure)
        .on('job succeeded', this.handleSuccess)
        .process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }

  handleSuccess(job, result) {
    console.log(`Queue ${job} succeeded with result: ${result}`);
  }
}

export default new Queue();
