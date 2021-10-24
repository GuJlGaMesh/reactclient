import React, { useState, useEffect } from "react";
import Form from "../Form/Form";

const UpdateUser = props => {
  const [metricData, setUser] = useState(props.currentUser);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...metricData, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <><Form
      onSubmit={async event => {
        event.preventDefault();
        if (!metricData.lastActivityDate || !metricData.registrationDate)
        {
        return;
        }
        if (metricData.lastActivityDate < metricData.registrationDate || metricData.userId < 0)
        {
        return;
      }
        else
        {
           await props.updateUser(metricData.id, metricData).then(()=>props.afterUpdate());
            // props.afterUpdate();
        }
      } }
      onInputChange={onInputChange}
      onCancel={cancel}
      metricData ={metricData} /></>
  );
};

export default UpdateUser;
