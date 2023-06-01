import React from "react";
interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;

    city: string;
  };
  isLogin: boolean;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthModalInputs({
  isLogin,
  inputs,
  handleChangeInput,
}: Props) {
  return (
    <>
      {!isLogin && (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="first name"
              value={inputs.firstName}
              name="firstName"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="last name"
              value={inputs.lastName}
              name="lastName"
              onChange={handleChangeInput}
            />
          </div>
        </>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded px-2 py-3 w-full"
          placeholder="email"
          value={inputs.email}
          name="email"
          onChange={handleChangeInput}
        />
      </div>
      {!isLogin && (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              type="number"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="Phone number"
              value={inputs.phoneNumber}
              name="phoneNumber"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="border rounded px-2 py-3 w-[49%]"
              placeholder="city"
              value={inputs.city}
              name="city"
              onChange={handleChangeInput}
            />
          </div>
        </>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded px-2 py-3 w-full"
          placeholder="password"
          value={inputs.password}
          name="password"
          onChange={handleChangeInput}
        />
      </div>
    </>
  );
}
