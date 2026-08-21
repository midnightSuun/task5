module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
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
