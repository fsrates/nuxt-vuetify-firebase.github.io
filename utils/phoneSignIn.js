import {
	signInWithPhoneNumber,
	RecaptchaVerifier,
	ConfirmationResult
} from 'firebase/auth';

import {
	auth
} from '~/plugins/firebase';

function PhoneAuth () {
  const that = this;

  const sendOtpCodeBtn = document.getElementById('send-otp-code');
	const signInSubmitBtn = document.getElementById('sign-in-submit');

  return function () {

  }
}

export function phoneSignIn () {
	const sendOtpCodeBtn = document.getElementById('send-otp-code');
	const signInSubmitBtn = document.getElementById('sign-in-submit');

	const recaptchaVerifier = new RecaptchaVerifier('send-otp-code', {
		'size': 'invisible',
		'callback': (response) => {
			sendOtpCode();
		}
	}, auth);

	recaptchaVerifier.render().then((widgetId) => {
		const recaptchaWidgetId = widgetId;
	});

	sendOtpCodeBtn.addEventListener('click', sendOtpCode);
  signInSubmitBtn.addEventListener('click', onSignInSubmit);
}

function sendOtpCode () {
  const phoneNumber = document.getElementById('phone-number').value;
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
    return confirmationResult;
  }).then((confirmationResult) => {
    window.confirmationResult = confirmationResult;
  });
}

function onSignInSubmit () {
  const otp = document.getElementById('otp').value;
  const confirmationResult = window.confirmationResult;
  return confirmationResult.confirm(otp).then((result) => {
    return result;
  }).catch (error => {
    if (error) {
      console.log(error);
    }
  });
}
