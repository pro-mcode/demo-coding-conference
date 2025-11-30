// import { useState } from "react";
import FileUploader from "../components/file-uploader";
export default function Form({
  avatar,
  setAvatar,
  email,
  setEmail,
  setGithub,
  name,
  setName,
  handleSubmit,
  errors,
  setErrors,
  validateField,
}) {
  return (
    <div className="form-container">
      <title>Coding Conference - Register</title>
      <h3 className="text-4xl font-bold text-primary text-center leading-10 tracking-wide md:text-[2.8rem] md:w-2xl md:leading-12 mx-auto">
        Your Journey to Coding Conf 2025 Starts Here!
      </h3>
      <p className="text-base text-center text-primary-300 tracking-wide mt-2 md:text-lg">
        Secure your spot at next year's biggest coding conference.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center  mx-auto mt-8 w-full max-w-md"
      >
        {/* Pass callback to receive file */}
        <FileUploader
          avatar={avatar}
          onFileSelect={setAvatar}
          errors={errors}
          setErrors={setErrors}
        />

        <div className="my-2 mt-4 w-full ">
          <label
            htmlFor="name"
            className="text-sm text-primary-300 tracking-wider block mb-2 self-start"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="bg-primary-500/20 border border-primary-300/60 rounded-xl p-3 w-full outline-none text-primary-300 text-base"
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="my-2 w-full">
          <label
            htmlFor="mail"
            className="text-sm text-primary-300 tracking-wider block mb-2 self-start"
          >
            Email
          </label>
          <input
            type="mail"
            id="mail"
            value={email}
            className="bg-primary-500/20 border border-primary-300/60 rounded-xl p-3 w-full outline-none text-primary-300 text-base lowercase"
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="my-2 w-full">
          <label
            htmlFor="github"
            className="text-sm text-primary-300 tracking-wider block mb-2 self-start"
          >
            Github Username (Optional)
          </label>
          <input
            type="text"
            id="github"
            className="bg-primary-500/20 border border-primary-300/60 rounded-xl p-3 w-full outline-none text-primary-300 text-base"
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`bg-main-500 text-lg text-primary-900 rounded-xl p-3 w-full outline-none mt-4 font-semibold  ${
            Object.keys(errors).length > 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-70"
          }`}
        >
          Generate Ticket
        </button>
      </form>
    </div>
  );
}
