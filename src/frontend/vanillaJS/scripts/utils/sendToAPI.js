const sendToAPI = {

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
      console.log(result)

      const apiData = (result.status !== 204) ? await result.json() : '';

      return apiData
    }

    catch(error) {
      console.log(error)
      throw new Error(`Posting to API failed ${error.message}`)
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

module.exports = sendToAPI