export const inputsData = [
  {
    id: 1,
    name: "firstName",
    type: "text",
    className: "input",
    messageerror:
      "Sorry, only letters (a-z), numbers (0-9), and space are allowed.",
    match: /^[a-zA-Z][a-zA-Z0-9 ]{3,}$/,
    label: "First Name",
    placeholder: "",
  },
  {
    id: 2,
    name: "lastName",
    type: "text",
    className: "input",
    messageerror:
      "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
    match: /^[a-zA-Z][a-zA-Z0-9 ]{3,}$/,

    label: "Last Name",
    //
    placeholder: "",
  },
  {
    id: 3,
    name: "birthday",
    type: "date",
    className: "input",
    label: "Birthday",
    messageerror: " Sorry, Birthday field is required",
    placeholder: "",
  },
  {
    id: 4,
    name: "email",
    type: "email",
    className: "input",
    messageerror: " Email should match format:Example123@gmail.com",
    match: /^[a-zA-Z][a-zA-Z0-9]{2,}@(gmail|hotmail).com$/,
    label: "Email",
    placeholder: "",
  },
  {
    id: 5,
    name: "password",
    type: "password",
    className: "input",
    messageerror:
      " Password should contain letter(A-z),number(0-9),charactere(!#)",
    match: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    label: " Password",
    placeholder: "",
  },
  {
    id: 6,
    name: "confirmPassword",
    type: "password",
    className: "input",
    messageerror: " confirm Password should match the password",
    match: "(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$",
    label: "confirm Password",
    placeholder: "",
  },
];
