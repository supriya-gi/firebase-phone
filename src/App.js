import { useState } from "react";
import "./App.css";
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {
  // const countryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState(false);
  const generateRechaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        // size: "invisible",
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
      console.log(phoneNumber);
      generateRechaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setExpandForm(true);
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const verifyOTP = (OTP) => {
    let confirmationResult = window.confirmationResult;
    setError(false);
    confirmationResult
      .confirm(OTP)
      .then((result) => {
        alert("Phone Number is Verified");
        setPhoneNumber("");
        setOTP("");
      })
      .catch((err) => setError(true));
  };
  const verifyotp = (e) => {
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
              <label for="phone">Phone Number: </label>&nbsp;
              <input
                // type="number"
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
                    onChange={verifyotp}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    verifyOTP(OTP);
                  }}
                >
                  Verify OTP
                </button>
                {error && (
                  <div style={{ color: "red" }}>Invalid OTP Entered</div>
                )}
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
