import { jobs } from "../../data";

export default defineEventHandler((event) => {
    
    const id = parseInt(getRouterParam(event, 'id') ?? '');

    if (!id) return setResponseStatus(event, 400);

    const job = jobs.find((job) => job.id == id);

    if (!job) return setResponseStatus(event, 404);
    
    return job;
});