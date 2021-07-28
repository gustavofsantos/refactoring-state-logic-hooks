import React from "react";
import "./styles.css";

function useFormState(
  initialState,
  validator = () => true
) {
  const [state, setState] = React.useState(initialState);
  const isValid = validator(state);

  const valueOf = (prop) => state[prop];

  const setValueOf = (prop, value) =>
    setState({ ...state, [prop]: value });

  return {
    isValid,
    valueOf,
    setValueOf
  };
}

const initialState = {
  email: "",
  password: ""
};

const validate = (state) =>
  !!state.email && state.password.length > 12;

export default function App() {
  const { valueOf, setValueOf, isValid } = useFormState(
    initialState,
    validate
  );

  return (
    <form className="form">
      <input
        placeholder="E-mail"
        type="email"
        value={valueOf("email")}
        onChange={(ev) =>
          setValueOf("email", ev.target.value)
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={valueOf("password")}
        onChange={(ev) =>
          setValueOf("password", ev.target.value)
        }
      />

      <button disabled={!isValid} title="login">
        Login
      </button>
    </form>
  );
}
