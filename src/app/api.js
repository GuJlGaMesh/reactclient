import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getUsers() {
  const response = axios.get(`${apiURL}/`);

  return response;
}

function getCreatedUser({id, userId, lastActivityDate, registrationDate }) {
  const response = axios.post(`${apiURL}/`, {
    id,
    userId,
    lastActivityDate,
    registrationDate
  });

  return response;
}

function getUpdatedUser(id, data) {
  const response = axios.put(`${apiURL}/${id}`, {
    id: id,
    userId: data.userId,
    lastActivityDate: data.lastActivityDate,
    registrationDate: data.registrationDate
  });

  return response;
}

function getDeletedUser(id) {
  const response = axios.delete(`${apiURL}/${id}`);

  return response;
}

function getMetricsValue()
{
  const response = axios.get(`${apiURL}/getretentionrate`);

  return response;
}

function getHistogram()
{
  const response = axios.get(`${apiURL}/gethistogramdata`);

  return response;
}

export { getUsers, getCreatedUser, getUpdatedUser, getDeletedUser, getMetricsValue, getHistogram };
