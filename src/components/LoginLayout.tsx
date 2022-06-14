import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_QUERY } from "../graphql/queries";
import { login } from "../store/authSlice";

const LoginLayout = () => {
  const [username, setUsername] = React.useState<any>();
  const [password, setPassword] = React.useState<any>();
  const [loginQuery, { loading, error, data }] = useLazyQuery<any>(LOGIN_QUERY);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    loginQuery({ variables: { username, password } }).then(res => {
      console.log('data : ', data)
      const user = res.data.login
      dispatch(login(user))
      navigate('/')
    }).catch(error => console.log(error))
  }

  return (
    <>
      <div className="text-lg font-semibold text-center mb-5">CONNEXION</div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-between                                                                                  ">
        <div className="">
          <fieldset className="mb-5">
            <label htmlFor="username" className="text-sm text-gray-500 mb-3">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 outline-none p-2 w-full rounded"
            />
          </fieldset>
          <fieldset className="mb-5">
            <label htmlFor="password" className="text-sm text-gray-500 mb-3">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 outline-none p-2 w-full rounded"
            />
          </fieldset>

          {error?.message && !loading && <div className="bg-red-200 py-1 px-2 text-sm rounded-md mb-5">{error.message}</div>}
          {!error && !loading && data?.login && <div className="bg-green-200 py-1 px-2 text-sm rounded-md mb-5">Connexion reussi !</div>}

        </div>
        <button className="flex items-center justify-center w-full outline-none border-none rounded bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2">
          {!loading ? <span>se connecter</span> :
            <span>
              loading...
            </span>
          }
        </button>
      </form>
    </>
  );
};

export default LoginLayout;
