import { jobs } from "../../data";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    if (!body) return setResponseStatus(event, 422, 'No body provided');

    if (!body.title || !body.company || !body.location) return setResponseStatus(event, 422, 'Missing required fields');

    const newJob = {
        id: jobs.length + 1,
        ...body,
    }

    jobs.push(newJob);

    return newJob;

});