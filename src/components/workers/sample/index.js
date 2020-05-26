import SampleWorker from "./sample.worker.js";

const sampleWorker = typeof window === "object" && new SampleWorker();

export default sampleWorker;
