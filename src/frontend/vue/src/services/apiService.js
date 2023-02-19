export const sendToAPI = {

  async post(serverUrl, postData) {
    return await this.fetchAPI(serverUrl, "POST", postData);
  },

  async get(serverUrl) {
    return await this.fetchAPI(serverUrl, "GET");
  },

  async delete(serverUrl, deleteData) {
    return await this.fetchAPI(serverUrl, "DELETE", deleteData);
  },

  async put(serverUrl, putData) {
    return await this.fetchAPI(serverUrl, "PUT", putData);
  },

  async fetchAPI(serverUrl, httpMethod, sendData) {

    try {

      const result = await fetch(serverUrl, createFetchOption(httpMethod, sendData))

      console.log("resss status", result.status, result.ok)

      if (result.ok !== true) {
        //ideally do some additional error handling for better error message here
        throw new Error(`Received status: ${(result.status !== undefined) ? result.status : 'undefined status'}`)
      }
      console.log("ressult in sendtoapi", result)

      const apiData = {
        statusOK: true,
        msg: "",
        data: (result.status !== 204) ? await result.json() : {}
      };

      return apiData
    }

    catch(error) {
      console.log(error)
      //throw new Error(` to API failed ${error.message}`)
      const apiData = {
        statusOK: false,
        msg: `Communication with API failed: ${error.message}`,
        data: { error: "error"}
      };
      return apiData
    }

  }

}


function createFetchOption(httpMethod, sendData) {

  const option = {
    method: httpMethod,
    headers: {
      "Accept": "application/json"
    }
  }

  if (httpMethod === "GET") return option

  option.headers["Content-Type"] = "application/x-www-form-urlencoded"
  option.body = new URLSearchParams(sendData)

    console.log("yoo in create", option)
  return option

}


export function handleApiResponse(apiResponse) {
  if (apiResponse === undefined || apiResponse.statusOK === undefined) {
    throw new Error("Received an undefined response from the server")
  }

  if (apiResponse.statusOK === true) {
    console.log("all good")
    return
  }

  if (apiResponse.statusOK === false) {
    console.log("Something went wrong on the server", apiResponse.msg)
    return;
  }
}