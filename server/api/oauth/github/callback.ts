

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { code } = getQuery(event);

    if (!code)
    {
        return setResponseStatus(event, 401);
    }


    const response: any = await $fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: {
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
            code: code,
        },
        headers: {
            Accept: 'application/json',
        },
    });


    const accessToken = response.access_token;

    const user = await $fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });


    setCookie(event, 'token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    return {
        user
    };
    
});
