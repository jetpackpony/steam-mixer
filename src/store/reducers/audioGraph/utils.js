import * as R from 'ramda';
import { isIn } from '../../../utils';

export const getNodeIndexByID = (id, arr) => (
  R.findIndex(R.propEq("nodeId", id))(arr)
);

/**
 * Removes all the inactive outputs from a single node's object
 *
 * @func
 * @sig [String] -> {k:v} -> {k:v}
 * @param {Array} activeNodesIds The list of nodes currently present in the graph
 * @param {Object} node The node object to remove outputs from
 * @return {Object} The node object with inactive outputs removed
 */
export const removeDeadOutputsForNode = (activeNodesIds) => (
  R.evolve({
    output: R.filter(isIn(activeNodesIds))
  })
);

/**
 * Goes over the list of audioGraph nodes `nodes`. For each node
 * removes outputs that are not in the list `nodes`.
 *
 * @func
 * @sig [a] -> [a]
 * @param {Array} nodes The list of audioGraph nodes
 * @return {Array} The new list of audioGraph nodes
 */
export const removeDeadOutputsFromList =
  R.converge(
    R.map,
    [
      R.compose(
        removeDeadOutputsForNode,
        R.pluck("nodeId")
      ),
      R.identity
    ]
  );

/**
 * Checks if a `nodesDeviceId` is in the list of `aliveDevices`
 *
 * @func
 * @sig [a] -> String -> Boolean
 * @param {Array} aliveDevices The list of active audio devices
 * @param {String} nodesDeviceId The id of the device to check
 * @return {Boolean} True if the device is in the list of active devices
 */
const isDeviceAlive =
  R.useWith(
    isIn,
    [R.pluck("deviceId"), R.identity]
  );

/**
 * Checks if a `node`'s device is in the list of `aliveDevices` or
 * null (which corresponds to a node that doesn't use an audio device)
 *
 * @func
 * @sig [a] -> {k:v} -> Boolean
 * @param {Array} aliveDevices list of active audio devices
 * @param {Object} node The node to check
 * @return {Boolean} True if node's device is active or null
 */
const isNodeAlive = (aliveDevices) =>
  R.compose(
    R.either(
      isDeviceAlive(aliveDevices),
      R.isNil
    ),
    R.prop("deviceId")
  );


/**
 * Goes over the list of audioGraph nodes `nodes` and removes
 * nodes that correspond to audio devices not in `aliveDevices` list
 *
 * @func
 * @sig [a] -> [b] -> [b]
 * @param {Array} aliveDevices The list of active audio devices
 * @param {Array} nodes The list of audioGraph nodes
 * @return {Array} The new list of audioGraph nodes
 */
export const removeNodesWithDeadDevices =
  R.compose(
    R.filter,
    isNodeAlive,
  );