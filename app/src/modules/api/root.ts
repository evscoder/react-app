export const productionPath = 'react-starter-blond.vercel.app';

export const paths = {
    api: '/api',
    basename: process.env.NODE_ENV === 'production' ? '' : '',
    index: '/'
};
