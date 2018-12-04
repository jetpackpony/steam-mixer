import * as R from 'ramda';
import plugins from './plugins';

/*
 * Takes an object where every property is a promise
 * Returns a promise which resolves to an object with same keys
 * and values corresponding to results of promises
 */
export const PromiseAllObj = (obj) => {
  return Promise.all(R.values(obj)).then(R.zipObj(R.keys(obj)));
};

const selectIdAndTitle = R.pick(["id", "title"]);
export const getAudioNodesTypes = () => (
  R.map(selectIdAndTitle, plugins)
);

const idIsEqual = R.propEq('id');
/*
 * [a] -> String -> {k:v}
 * Takes a list of plugins and a plugin ID.
 * Returns a plugin's object
 */
export const getPluginByTypeId =
  R.flip(R.useWith(R.find, [idIsEqual, R.identity]))

const getDefaultsFromProps = R.converge(R.zipObj, [R.pluck('id'), R.pluck('default')]);
/*
 * [a] -> String -> {k:v}
 * Takes a list of plugins and a plugin ID.
 * Returns an object with default values for the plugin's props
 */
export const getDefaultPropsForPlugin =
  R.curry(
    R.compose(
      getDefaultsFromProps,
      R.prop("props"),
      getPluginByTypeId
    )
  );

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