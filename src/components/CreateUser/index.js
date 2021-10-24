import React, { useState } from "react";
import Form from "../Form/Form";

const CreateUser = props => {
  const initialData = { id: null, userId: "", lastActivityDate: Date.now(), registrationDate: Date.now() };
  const [metricData, setUser] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...metricData, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <><Form
    onSubmit={async event => {
      event.preventDefault();
      if (!metricData.lastActivityDate || !metricData.registrationDate)
      return;
      if (metricData.lastActivityDate < metricData.registrationDate || metricData.userId < 0)
      {
      return;
      }
      else
      {
      props.createUser(metricData);
      }
    } }
    onInputChange={onInputChange}
    onCancel={cancel}
    metricData ={metricData} /></>
  );
};

export default CreateUser;
