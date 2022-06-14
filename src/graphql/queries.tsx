import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($username:String!,$password:String!){
    login(username:$username,password:$password){
      id
      username
      sex
      password
      favorites{
        id
        name
      }
      isAdmin
      createdAt
      updatedAt
    }
  }
`;

export const USERS_QUERY = () => gql``;

export const USER_QUERY = (id: any) => gql``;

export const BOOKS_QUERY = gql`
  query Books{
    books {
      id
      name
      cover
      author
      edition
      editionDate
      summary
      numberPages
      likers {
        id
        username
        sex
      }
      comments {
        id
        user{
            id
            username
            sex
        }
        text
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const BOOK_QUERY = gql`
  query Book($id:ID!){
    book(id:$id) {
        id
        name
        cover
        author
        edition
        editionDate
        summary
        numberPages
        likers {
            id
            username
            sex
        }
        comments {
            id
            user{
                id
                username
                sex
            }
            text
            createdAt
        }
        createdAt
        updatedAt
    }
  }
`;
