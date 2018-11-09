import * as R from 'ramda';

export const getNodeIndexByID = (id, arr) => (
  R.findIndex(R.propEq("nodeId", id))(arr)
);