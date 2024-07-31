import axios from "axios";

const SERVER_URL = "http://localhost:4000";

export const getRequest = async (
  router: string,
  reqSuccess = (data: any) => {},
  reqFailed = (err: any) => {}
) => {
  try {
    const url = SERVER_URL + router;
    const res = await axios.get(url);
    const data = await res.data;

    res.status === 200
      ? reqSuccess(data)
      : reqFailed(new Error(res.status.toString()));
  } catch (err) {
    reqFailed(err);
  }
};

export const postRequest = async (
  router: string,
  body = {},
  reqSuccess = (data: any) => {},
  reqFailed = (err: any) => {}
) => {
  try {
    const url = SERVER_URL + router;
    const res = await axios.post(url, body);
    const data = await res.data;
    console.log(res.data);
    (res.status >= 200 && res.status <= 205) 
      ? reqSuccess(data)
      : reqFailed(new Error(res.status.toString()));
  } catch (err) {
    reqFailed(err);
  }
};

export const patchRequest = async (
  router: string,
  body = {},
  reqSuccess = (data: any) => {},
  reqFailed = (err: any) => {}
) => {
  try {
    const url = SERVER_URL + router;
    const res = await axios.patch(url, { data: body });
    const data = await res.data;

    res.status === 200
      ? reqSuccess(data)
      : reqFailed(new Error(res.status.toString()));
  } catch (err) {
    reqFailed(err);
  }
};

export const putRequest = async (
  router: string,
  body = {},
  reqSuccess = (data: any) => {},
  reqFailed = (err: any) => {}
) => {
  try {
    const url = SERVER_URL + router;
    const res = await axios.put(url, body);
    const data = await res.data;

    res.status === 200
      ? reqSuccess(data)
      : reqFailed(new Error(res.status.toString()));
  } catch (err) {
    reqFailed(err);
  }
};

export const deleteRequest = async (
  router: string,
  body = {},
  reqSuccess = (data: any) => {},
  reqFailed = (err: any) => {}
) => {
  try {
    const url = SERVER_URL + router;
    const res = await axios.delete(url, { data: body });
    const data = await res.data;

    res.status === 200
      ? reqSuccess(data)
      : reqFailed(new Error(res.status.toString()));
  } catch (err) {
    reqFailed(err);
  }
};
