applyRoutes = (router, routes) => {
    for (const route of routes) {
        const {method, path, handler} = route;
        try {
            (router)[method.toLowerCase()](path, handler);
        }
        catch (err) {
            console.error(method);
            console.error(path);
            console.error(handler);
            console.error("applyRoutes", err);
            process.exit(0);
        }
    }
}

module.exports = {
    applyRoutes,
}