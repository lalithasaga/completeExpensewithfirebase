import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const EmailVerificationPopup = () => {
  const { isLoggedIn, isEmailVerified } = useContext(AuthContext);

  const sendVerificationEmail = () => {
    const user = firebase.auth().currentUser;
  
    if (user) {
      user.sendEmailVerification()
        .then(() => {
          console.log('Verification email sent.');
        })
        .catch((error) => {
          console.error('Error sending verification email:', error);
        });
    } else {
      console.error('User is not authenticated.');
    }
  };
  
  return (
    <div className="popup">
      {isLoggedIn && !isEmailVerified && (
        <>
          <p>Please verify your email address.</p>
          <button onClick={sendVerificationEmail}>Verify Email</button>
        </>
      )}
      {isLoggedIn && isEmailVerified && (
        <p>Your email is now verified.</p>
      )}
    </div>
  );
};

export default EmailVerificationPopup; 

/*import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const EmailVerificationPopup = () => {
  const { isLoggedIn, isEmailVerified } = useContext(AuthContext);
  const [isSendingVerificationEmail, setIsSendingVerificationEmail] = useState(false);

  const sendVerificationEmail = () => {
    setIsSendingVerificationEmail(true);

    const user = firebase.auth().currentUser;

    if (user) {
      user.sendEmailVerification()
        .then(() => {
          setIsSendingVerificationEmail(false);
          console.log('Verification email sent.');
        })
        .catch((error) => {
          setIsSendingVerificationEmail(false);
          console.error('Error sending verification email:', error);
        });
    } else {
      console.error('User is not authenticated.');
    }
  };

  return (
    <div className="popup">
      {isLoggedIn && !isEmailVerified && (
        <>
          <p>Please verify your email address.</p>
          {isSendingVerificationEmail ? (
            <p>Sending verification email...</p>
          ) : (
            <button onClick={sendVerificationEmail}>Verify Email</button>
          )}
        </>
      )}
      {isLoggedIn && isEmailVerified && (
        <p>Your email is now verified.</p>
      )}
    </div>
  );
};

export default EmailVerificationPopup;*/



