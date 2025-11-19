import { useState } from "react";
import "./App.css";

import Form from "./pages/form";
import Ticket from "./pages/ticket";

function App() {
  const [ticketId, setTicketId] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const generateTicketId = () => {
    const now = new Date();

    const MM = String(now.getMonth() + 1).padStart(2, "0");
    const DD = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

    return `${MM}${DD}-${random}`;
  };
  const validateField = (field, value) => {
    let message = "";

    switch (field) {
      case "name":
        if (!value.trim()) message = "Name is required";
        break;

      case "email":
        if (!value.trim()) {
          message = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          message = "Enter a valid email";
        }
        break;

      case "avatar":
        if (!value) message = "Avatar image is required"; // value is file object
        break;

      default:
        break;
    }

    // Update specific field error
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Avatar validation
    if (!avatar) {
      newErrors.avatar = "Avatar image is required";
    } else {
      const validTypes = ["image/png", "image/jpeg"];

      if (!validTypes.includes(avatar.type)) {
        newErrors.avatar = "Avatar must be JPG or PNG";
      }

      if (avatar.size > 500 * 1024) {
        newErrors.avatar = "Image must be less than 500 KB";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear a single error
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.avatar; // remove avatar error
      return newErrors;
    });

    setErrors({}); // Clear errors if everything is valid

    const id = generateTicketId();
    setTicketId(id);
    setIsSubmit(true);

    console.log("Form Data:");
    console.log({
      avatar,
      name,
      email,
      github,
    });
  };

  return (
    <div className="relative responsive-bg max-h-screen ">
      <img
        src="assets/images/pattern-squiggly-line-top.svg"
        alt=""
        srcset=""
        className="absolute top-10 right-0 max-w-40 md:max-w-xs"
      />
      <img
        src="assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
        alt=""
        srcset=""
        className="absolute bottom-0 left-0 lg:hidden"
      />
      <img
        src="assets/images/pattern-squiggly-line-bottom-desktop.svg"
        alt=""
        srcset=""
        className="absolute bottom-0 left-0 hidden lg:block"
      />
      <img
        src="assets/images/pattern-circle.svg"
        alt=""
        srcset=""
        className="absolute top-[50%] right-[20%] w-auto h-auto max-h-42 max-w-42"
      />
      <img
        src="assets/images/pattern-circle.svg"
        alt=""
        srcset=""
        className="absolute -top-20 left-10 w-auto h-auto max-h-42 max-w-42"
      />

      <div className=" max-w-[1440px] mx-auto flex flex-col justify-center items-center">
        <div className="absolute inset-0 lines-bg flex flex-col justify-start items-center min-h-screen overflow-scroll z-20">
          <div className="w-[90%] mx-auto pt-12 pb-24 z-10 md:w-full">
            <img
              src="assets/images/logo-full.svg"
              alt=""
              srcset=""
              className="mx-auto mb-12"
            />
            {!isSubmit ? (
              <Form
                avatar={avatar}
                setAvatar={setAvatar}
                email={email}
                setEmail={setEmail}
                setGithub={setGithub}
                name={name}
                setName={setName}
                handleSubmit={handleSubmit}
                errors={errors}
                setErrors={setErrors}
                validateField={validateField}
              />
            ) : (
              <Ticket
                id={ticketId}
                name={name}
                email={email}
                github={github}
                avatar={avatar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
