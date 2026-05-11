let authToken = "";

function setToken(token) {
  authToken = token;
}

async function log(stack, level, packageName, message) {

    const url = "http://4.224.186.213/evaluation-service/logs";

  const body = {
    stack: stack,
    level: level,
    package: packageName,
    message: message,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("log sent successfully:", data);
    return data;
  } catch (error) {
    console.log("something went wrong while sending the log:", error);
  }
}

module.exports = { setToken, log };