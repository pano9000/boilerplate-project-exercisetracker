async function postToAPI(serverUrl, postData) {

  try {
    const result = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(postData)
    })

    if (result.ok !== true) {
      //ideally do some additional error handling for better error message here
      throw new Error()
    }

    const apiData = await result.json()

    return apiData
  }

  catch(error) {
    console.log(error)
    throw new Error("Posting to API failed")
  }

}

module.exports = postToAPI