export const sendToAPI = {

  async post(serverUrl, postData) {
    return await this.fetchAPI(serverUrl, "POST", postData);
  },

  async get(serverUrl) {
    return await this.fetchAPI(serverUrl, "GET");
  },

  async head(serverUrl) {
    return await this.fetchAPI(serverUrl, "HEAD");
  },

  async delete(serverUrl, deleteData) {
    return await this.fetchAPI(serverUrl, "DELETE", deleteData);
  },

  async put(serverUrl, putData) {
    return await this.fetchAPI(serverUrl, "PUT", putData);
  },

  async fetchAPI(serverUrl, httpMethod, sendData) {

    try {
      const result = await fetch(serverUrl, createFetchOption(httpMethod, sendData));

      if (httpMethod === "HEAD" && [204, 404].includes(result.status)) {
        return new ApiResponseStatus(true, "", {available: (result.status === 404) ? true : false });
        // 404 -> "Not Found", so the resource name is available, for creation
        // 204 "No Content" -> resource name exists already, so name is not available
      }

      if (result.ok !== true) {
        //ideally do some additional error handling for better error message here
        throw new Error(`Received status: ${(result.status !== undefined) ? result.status : 'undefined status'}`)
      }

      const apiData = (result.status !== 204) ? await result.json() : {};

      return new ApiResponseStatus(true, "", apiData);
    }

    catch(error) {
      console.log(error)
      return new ApiResponseStatus(false, `Communication with API failed: ${error.message}`, {})
    }

  }

}


/**
* @param {Boolean} statusOK 
* @param {String} msg 
* @param { {} } data 
*/
function ApiResponseStatus(statusOK, msg, data) {
  this.statusOK = statusOK;
  this.msg = msg;
  this.data = data;
}


function createFetchOption(httpMethod, sendData) {

  const option = {
    method: httpMethod,
    headers: {
      "Accept": "application/json"
    }
  }

  if (["GET", "HEAD"].includes(httpMethod) === false) {
    option.headers["Content-Type"] = "application/x-www-form-urlencoded"
    option.body = new URLSearchParams(sendData)
  }

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