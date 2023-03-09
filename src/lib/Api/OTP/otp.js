import { BASE_URL } from "../../constants.js"

let OTP = {
    otp_gened: false,
    captcha_token: "",
    show_otp_msg: true,
    order_id: ""
}

OTP.storeCaptchaToken = function(resp) {
  if(resp && resp.detail && resp.detail.token) {
    OTP.captcha_token = resp.detail.token
  } else {
    OTP.captcha_token = ""
  }
}

OTP.onCaptchaSuccess = function(resp) {
  OTP.storeCaptchaToken(resp)
  
  if(OTP.captcha_token && OTP.captcha_token.length) {
    OTP.genotp(OTP.captcha_token);
  }
}

OTP.onCaptchaTimeout = function() {
}

OTP.genotp = function(resp) {
  if(!OTP.otp_gened) {
    OTP.otp_gened = true;
    const payload = {
      recaptcha: resp,
    };

    fetch(
      `${BASE_URL}/api/v1/contact/order/otp?uuid=${OTP.order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }
}

export {OTP};