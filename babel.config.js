module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: isDevelopment,
        },
      ],
    ],
  };
};
