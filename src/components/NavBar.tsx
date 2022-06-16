import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import styled from "styled-components";

// const pages = [
//   {
//     name: "NOS LIVRES",
//     path: "/books",
//   },
//   {
//     name: "MES FAVORIS",
//     path: "/favorites",
//   },
// ];

export const NavBar = () => {
  const user: any = useSelector<any>((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleLogout = () => dispatch(logout({}));

  return (
    <React.Fragment>
      <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200">
        <div className="max-w-4xl mx-auto flex flex-wrap py-3 px:10 md:px-0 flex-col md:flex-row items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <div
              className="font-semibold text-xl text-blue-500"
              style={{ lineHeight: 1 }}
            >
              BEST<span className="text-gray-600">SELLER</span>
            </div>
          </NavLink>
          <nav className="md:ml-auto flex flex-wrap gap-7 items-center text-sm text-gray-600 uppercase">
            <NavLink to="/books" className="navlink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </NavLink>
            <NavLink to="/favorites" className="navlink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </NavLink>
            <NavLink to={"/add-book"} className="navlink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </NavLink>
            <div
              title="Se deconnecter"
              className="cursor-pointer navlink text-red-500"
              onClick={() => toggleModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 relative font-medium md:ml-5 rounded p-2 border border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{user.username}</span>
            </div>
          </nav>
        </div>
      </header>

      <Modal show={showModal} toggle={toggleModal} logout={handleLogout} />
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const ModalOverlay = styled.div`
  background: #1818187d;
  z-index: 11;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
`;

const Modal = ({ show = false, toggle, logout }: any) => {
  if (!show) return null;

  return (
    <Wrapper>
      <ModalOverlay className="h-full w-full" onClick={() => toggle()} />
      <ModalWrapper className="bg-white rounded">
        <div className="font-semibold px-7 py-4 border-b border-b-gray-400">
          Déconnexion
        </div>

        <div className="px-7 py-8">
          <div className="text-sm px-4 text-center mb-10">
            Souhaitez-vous vraiment vous deconnecter ?
          </div>

          <div className="flex justifu-center gap-2 text-sm text-center ">
            <div
              className=" flex-1 p-2 bg-red-500 hover:bg-red-600 rounded text-white  cursor-pointer"
              onClick={() => logout()}
            >
              Se deconnecter
            </div>
            <div
              className="flex-1 p-2 border border-gray-300 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
              onClick={() => toggle()}
            >
              Annuler
            </div>
          </div>
        </div>
      </ModalWrapper>
    </Wrapper>
  );
};
