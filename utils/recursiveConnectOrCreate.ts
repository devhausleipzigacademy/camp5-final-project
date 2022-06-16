export function recursiveConnectOrCreate(
    path: Array<string>,
    query = {},
    depth = 1
) {
    const createObj = { title: path.at(-depth) };
    //@ts-ignore
    query.parent = {
        connectOrCreate: {
            where: { title: path.at(-depth) },
            create: createObj,
        },
    };

    if (depth < path.length) {
        recursiveConnectOrCreate(path, createObj, depth + 1);
    }

    return query;
}
