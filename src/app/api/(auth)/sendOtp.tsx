import axios from "axios";
const FAST2SMSAUTH: any = process.env.FAST2SMSAUTH;
const sendOtp = ({
  verificationCode,
  mobileNumber,
}: {
  verificationCode: string;
  mobileNumber: string;
}) => {
  axios
    .post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        variables_values: verificationCode,
        route: "otp",
        numbers: mobileNumber,
      },
      {
        headers: {
          authorization: FAST2SMSAUTH,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendOtp;
