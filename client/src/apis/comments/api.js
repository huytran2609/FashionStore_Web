export const getComments = async () => {
    return [
        {
            id: '1',
            body: 'Wow that is awesome',
            username: 'Duc',
            userId: '1',
            parentId: null,
            createdAt: '2024-01-16T23:00:33.010+02:00',
        },
        {
            id: '2',
            body: "I think this is the first time I've seen this website",
            username: 'Huy',
            userId: '2',
            parentId: null,
            createdAt: '2024-01-16T23:00:33.010+02:00',
        },
        {
            id: '3',
            body: 'Thanks for signing up for this project.',
            username: 'Huy',
            userId: '2',
            parentId: '1',
            createdAt: '2024-01-16T23:00:33.010+02:00',
        },
        {
            id: '4',
            body: 'Yeah and awesome',
            username: 'Huy',
            userId: '2',
            parentId: '2',
            createdAt: '2024-01-16T23:00:33.010+02:00',
        },
    ];
};

export const createComment = async (text, parentId = null) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId,
        userId: '1',
        username: 'Duc',
        createdAt: new Date().toISOString(),
    };
};

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};
