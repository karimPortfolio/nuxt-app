
export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();

    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=user:email`;

    return sendRedirect(event, redirectUrl);

});

