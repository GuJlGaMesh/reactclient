import React from "react";
import Histogram from 'react-chart-histogram';


// Styles
//import "./style.scss";

const RollingRetention = props => {
 const visible = props.visible;
 const metric = props.metric;
 const labels = props.histogramData.labels;
  const data = props.histogramData.data;
  const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
  return (<div>
    {visible ? (  <><br/><div>Rolling retention is {metric}%.</div><br/><div>
      <Histogram xLabels={labels} yValues={data} width='800' height='400' options={options} />
    </div><br/></>
    ): (<div></div>)}
    </div>
  );
};

export default RollingRetention;
