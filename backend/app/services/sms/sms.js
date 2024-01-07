const url = "http://portal.smshub.live/API/SendBulkSMS";

function send_otp_sms({ otp, sms_contact }) {
  let data = {
    source:  `AXON ME`,
    destination: sms_contact,
    text: `Your One-Time Password for Vlookin Registration  is ${otp}`,
    };
  let send_sms_response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      return data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      throw error;
    });

  return send_sms_response;
}

module.exports = { send_otp_sms };
