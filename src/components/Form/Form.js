import React, { useState, useEffect } from "react";

const Form = props =>
{
    const metricdata = props.metricData;


    const metricData = props.metricData;
    return(
        <form
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
              >
      <div className="form-group">
          <label>User Id</label>
          <input
            type="number"
            name="userId"
            value={metricData.userId}
            onChange={props.onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Registration date</label>
          <input
            type="date"
            name="registrationDate"
            value={metricData.registrationDate.toString()}
            onChange={props.onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last activity date</label>
          <input
            type="date"
            name="lastActivityDate"
            onChange={props.onInputChange}
          />
        </div>
        <div className="form-group form-group--actions">
          <button className="primary-btn">Create</button>
          <button className="cancel-btn" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
}

export default Form;