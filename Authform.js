import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AuthContext } from './AuthContext';
import './Authform.css';

const AuthForm = () => {  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setIsForgotPassword(false);
  };

  const forgotPasswordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
  
    setIsLoading(true);
    setError(null);

    try {
      await firebase.auth().sendPasswordResetEmail(enteredEmail);
      setError(null);
      // Display a success message to the user or redirect them to a confirmation page
      console.log('Password reset email sent.');
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

    setIsLoading(true);
    setError(null);

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await firebase.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword);
        const user = response.user;
        const expirationTime = new Date().getTime() + 3600000; // Set expiration time to 1 hour from now
        authCtx.login(user.uid, expirationTime);
        // Redirect to the dashboard or any desired page using alternative method
        window.location.href = '/dashboard';
      } else {
        const response = await firebase.auth().createUserWithEmailAndPassword(enteredEmail, enteredPassword);
        const user = response.user;
        const expirationTime = new Date().getTime() + 3600000; // Set expiration time to 1 hour from now
        authCtx.login(user.uid, expirationTime);
        // Redirect to the dashboard or any desired page using alternative method
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input className="input" type="password" id="password" required ref={passwordInputRef} />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input"
                type="password"
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <div className="button">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
            )}
          </div>
        </form>
        <div className="switch">
          {isLogin ? (
            <>
              <p>
                Don't have an account?{' '}
                <Link to="#" onClick={switchAuthModeHandler}>
                  Sign up
                </Link>
              </p>
              {!isForgotPassword && (
                <p>
                  <Link to="#" onClick={forgotPasswordHandler}>
                    Forgot Password?
                  </Link>
                </p>
              )}
            </>
          ) : isForgotPassword ? (
            <>
              <p>
                Remember your password?{' '}
                <Link to="#" onClick={switchAuthModeHandler}>
                  Login
                </Link>
              </p>
              <p>
                <Link to="#" onClick={forgotPasswordHandler}>
                  Cancel
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Already have an account?{' '}
                <Link to="#" onClick={switchAuthModeHandler}>
                  Login
                </Link>
              </p>
              <p>
                <Link to="#" onClick={forgotPasswordHandler}>
                  Forgot Password?
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;



