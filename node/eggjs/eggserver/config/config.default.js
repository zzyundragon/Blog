/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589424304619_2723';

  // add your middleware config here
  config.middleware = ['errorHandle'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    swaggerdoc: {
      dirScanner: './app/controller',
      apiInfo: {
        title: 'eggServer-swagger接口文档',
        description: 'swagger-ui for egg',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/eggServer',
        options: {
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          bufferMaxEntries: 0
        } // ,
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      },
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
