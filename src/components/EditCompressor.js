import React, { Fragment } from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

const EditCompressor = ({
  nodeId, isOpen, toggle,
  onCompressorPropsChange,
  compressorProps
}) => {
  const onChange = (event) => {
    onCompressorPropsChange(nodeId, {
      ...compressorProps,
      [event.target.id]: event.target.value
    });
  }
  const boundToggle = toggle.bind(null, nodeId);
  return (
    <ModalBox
      isOpen={isOpen}
      toggle={boundToggle}
      header="Edit Compressor"
      body={
        <Fragment>
          <div>
            <label>Attack</label>
            <input
              id="attack"
              type="number"
              value={compressorProps.attack}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Knee</label>
            <input
              id="knee"
              type="number"
              value={compressorProps.knee}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Ratio</label>
            <input
              id="ratio"
              type="number"
              value={compressorProps.ratio}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Release</label>
            <input
              id="release"
              type="number"
              value={compressorProps.release}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Threshold</label>
            <input
              id="threshold"
              type="number"
              value={compressorProps.threshold}
              onChange={onChange}
            />
          </div>
        </Fragment>
      }
      footer={
        <OkButton onClick={boundToggle} />
      }
    />
  );
};

export default EditCompressor;