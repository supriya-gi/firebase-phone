import { useState } from "react";
import "./App.css";
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {
  // const countryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRechaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };
  const requestOTP = async (e) => {
    e.preventDefault();

    if (phoneNumber.length >= 12) {
      setExpandForm(true);

      generateRechaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      console.log(otp);
    }
  };
  return (
    <div className="container">
      <div className="row justify-center">
        <div className="col-sm-6">
          <h2>Phone Registraion</h2>
          <form onSubmit={requestOTP}>
            <div class="mb-3 mt-3">
              <label for="phone">Phone Number</label>
              <input
                type="number"
                placeholder="Enter phone Number"
                name="phone"
                // value={("+91", phoneNumber)}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {expandForm === true ? (
              <>
                <div class="mb-3 mt-3">
                  <label for="otpInput">OTP</label>
                  <input
                    type="number"
                    placeholder="Enter OTP here"
                    name="otpInput"
                    value={OTP}
                    onChange={verifyOTP}
                  />
                </div>
              </>
            ) : null}
            {expandForm === false ? (
              <button type="submit" class="btn btn-primary">
                Request OTP
              </button>
            ) : null}
            <div id="recaptcha-container"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
