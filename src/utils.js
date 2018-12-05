import * as R from 'ramda';
import plugins from './plugins';

/**
 * Takes an object where every property is a promise
 * Returns a promise which resolves to an object with same keys
 * and values corresponding to results of promises
 * 
 * @param {Object} obj An object each property of which is an promise
 * @returns {Promise} A promise that resolves to the same shape as input object
 */
export const PromiseAllObj = (obj) => {
  return Promise.all(R.values(obj)).then(R.zipObj(R.keys(obj)));
};

export const getAudioNodesTypes = () => (
  R.map(R.pick(["id", "title"]), plugins)
);

/**
 * Returns a plugin by plugin's ID
 * 
 * @func
 * @param {Array} pluginList The list of plugins
 * @param {String} pluginId A plugin id to search for
 * @returns {Object} A plugin with the `pluginId`
 */
export const getPluginByTypeId =
  R.useWith(
    R.flip(R.find),
    [R.identity, R.propEq('id')]
  );

/**
 * Takes a list of plugin's props
 * Returns an object where keys are props' names and values are
 * props' default values
 * 
 * @func
 * @param {Array} propList The list of plugin's props
 * @returns {Object} Default values for plugin's props
 */
const getDefaultsFromPluginProps =
  R.converge(
    R.zipObj,
    [R.pluck('id'), R.pluck('default')]
  );

/**
 * Takes a list of plugins and a plugin ID.
 * Returns an object with default values for the plugin's props
 * 
 * @func
 * @param {Array} pluginList The list of plugins
 * @param {String} pluginId A plugin id to search for
 * @returns {Object} Default values for plugin's props
 */
export const getDefaultPropsForPlugin =
  R.curry(
    R.compose(
      getDefaultsFromPluginProps,
      R.prop("props"),
      getPluginByTypeId
    )
  );

/**
 * Takes a list of plugins and a plugin ID.
 * Returns plugin's VAG code
 * 
 * @func
 * @param {Array} pluginList The list of plugins
 * @param {String} pluginId A plugin id to search for
 * @returns {Function} Plugin's VAG code
 */
export const getPluginsVagCode =
  R.curry(
    R.compose(
      R.prop('vagCode'),
      getPluginByTypeId
    )
  );

export const bindPluginUtils = (plugins) => ({
  getPluginByTypeId: getPluginByTypeId(plugins),
  getDefaultPropsForPlugin: getDefaultPropsForPlugin(plugins),
  getPluginsVagCode: getPluginsVagCode(plugins)
});

export const isIn = R.flip(R.contains);