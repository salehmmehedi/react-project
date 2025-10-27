import React, { useState } from "react";
import sign from "../../assets/sign.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setemailErr] = useState("");

  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setemailErr("");
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameErr("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };
  const handleSignUp = () => {
    if (!email) {
      setemailErr("Email is required!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setemailErr("Right email is requird!");
      }
    }

    if (!fullName) {
      setFullNameErr("Full name is required!");
    }
    if (!password) {
      setPasswordErr("Password is required!");
    } else {
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordErr("Must contain at least one lowercase letter!");
      } else if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordErr("Must contain at least one uppercase letter!");
      } else if (!/(?=.*[0-9])/.test(password)) {
        setPasswordErr("Must contain at least one number!");
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordErr("Must contain at least one special character!");
      } else if (!/(?=.{8,})/.test(password)) {
        setPasswordErr("The string must be eight characters or longer!");
      }
    }
    if (
      email &&
      fullName &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success("Registration successfully done");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          // setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorCode);
          setemailErr("This email is already in use.");
          setLoading(false);
          // ..
        });
    }
  };
  return (
    <>
      <div className="flex items-center h-screen">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="flex justify-end w-[50%] mr-[70px] ">
          <div>
            <div>
              <h1 className="text-[34px] font-bold font-secendry text-primary">
                Get started with easily register
              </h1>
              <p className="text-[20px] font-normal text-black/50 font-secendry mt-[13px]">
                Free register and you can enjoy it
              </p>
              <div>
                <div className="w-[366px] mt-[40px] relative">
                  <input
                    onChange={handleEmail}
                    type="email"
                    placeholder="Email Addres"
                    className="w-full py-[20px] pl-[52px] pr-[66px] border-[2px] border-[#11175D] rounded-[8px]"
                  />
                  <p className="pt-[5px] text-[16px] text-red-500 font-semibold">
                    {emailErr}
                  </p>
                  <p className="absolute top-[-13px] left-[45px] px-[10px] bg-white tracking-[2px]">
                    Email Address
                  </p>
                </div>
                <div className="w-[366px] mt-[40px] relative">
                  <input
                    onChange={handleFullName}
                    type="text"
                    placeholder="Full Name"
                    className="w-full py-[20px] pl-[52px] pr-[66px] border-[2px] border-[#11175D] rounded-[8px]"
                  />
                  <p className="pt-[5px] text-[16px] text-red-500 font-semibold">
                    {fullNameErr}
                  </p>
                  <p className="absolute top-[-13px] left-[45px] px-[10px] bg-white tracking-[2px]">
                    Full Name
                  </p>
                </div>
                <div className="w-[366px] mt-[40px] relative">
                  <div className="relative">
                    <input
                      onChange={handlePassword}
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      className="w-full py-[20px] pl-[52px] pr-[66px] border-[2px] border-[#11175D] rounded-[8px]"
                    />
                    <div className="absolute right-[10px] top-[50%] -translate-y-[50%] cursor-pointer">
                      {show ? (
                        <FaEye
                          onClick={() => {
                            setShow(!show);
                          }}
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() => {
                            setShow(!show);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <p className="pt-[5px] text-[16px] text-red-500 font-semibold">
                    {passwordErr}
                  </p>
                  <p className="absolute top-[-13px] left-[45px] px-[10px] bg-white tracking-[2px]">
                    Password
                  </p>
                </div>
              </div>
              <div>
                {loading ? (
                  <div className="flex justify-center w-[368px] py-[20px]">
                    <RotatingLines
                      visible={true}
                      height="96"
                      width="96"
                      color="green"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleSignUp}
                    className="z-[111] relative bg-primary py-[20px] cursor-pointer px-[150px] text-white rounded-[88px] text-[20px] font-semibold font-secendry mt-[51px] mb-[35px]"
                  >
                    <span> Sign up</span>
                    <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-[#5B36F5]/25 h-[28px] w-[71px] blur-[10px] z-[-1]"></span>
                  </button>
                )}

                <p className="text-[14px] font-primary text-[#03014C] font-semibold w-[368px] text-center">
                  Already have an account ?{" "}
                  <Link to="/login">
                    <span className="text-[#EA6C00] font-bold">Sign In</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-fit">
          <img
            src={sign}
            className="h-screen w-full object-cover object-end"
            alt="sign"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
