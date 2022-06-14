import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ShadowGradient = styled.div`
  &::after {
    content: "";
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(1, 1, 3, 0) 0%,
      rgba(1, 1, 2, 0.39) 48%,
      rgba(0, 0, 0, 0.863) 100%
    );
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
  }
`;

const Card = ({ id, name, author, cover }: any) => {
  return (
    <Link
      to={`/book/${id}`}
      className="w-full card-book relative rounded overflow-hidden cursor-pointer hover:shadow-xl hover:scale-110 delay-300 ease-in"
    >
      <ShadowGradient className="h-full relative overflow-hidden">
        <img
          src={cover}
          className="h-full w-full object-cover"
          alt="book_image"
        />
      </ShadowGradient>
      <div className="p-4 absolute top-1/2 right-0 left-0 text-white hidden book-details">
        <div className="text-sm font-bold mb-2">{name}</div>
        <div className="text-sm text-gray-200">{author}</div>
      </div>
    </Link>
  );
};

export default Card;
