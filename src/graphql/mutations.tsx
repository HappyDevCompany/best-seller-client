import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $sex: String!) {
    register(username: $username, password: $password, sex: $sex) {
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

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook(
    $name: String!
    $cover: String!
    $author: String!
    $edition: String!
    $editionDate: String!
    $summary: String!
    $numberPages: String!
  ) {
    createBook(
      name: $name
      cover: $cover
      author: $author
      edition: $edition
      editionDate: $editionDate
      summary: $summary
      numberPages: $numberPages
    ) {
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
        user {
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

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook(
    $id: ID!
    $name: String
    $cover: String
    $author: String
    $edition: String
    $editionDate: String
    $summary: String
    $numberPages: String
  ) {
    updateBook(
      id: $id
      name: $name
      cover: $cover
      author: $author
      edition: $edition
      editionDate: $editionDate
      summary: $summary
      numberPages: $numberPages
    ) {
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
        user {
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

export const deleteBookMutation = (id: any) => gql`
    {
        deleteBook(id:${id})
    }
`;

export const LIKE_BOOK_MUTATION = gql`
  mutation LikeBook($id: ID!, $userId: ID!) {
    likeBook(id: $id, userId: $userId) {
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
        user {
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

export const DISLIKE_BOOK_MUTATION = gql`
  mutation DislikeBook($id: ID!, $userId: ID!) {
    dislikeBook(id: $id, userId: $userId) {
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
        user {
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

export const ADD_COMMENT_BOOK_MUTATION = gql`
  mutation AddCommentBook($id: ID!, $userId: ID!, $text: String!) {
    addCommentBook(id: $id, userId: $userId, text: $text) {
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
        user {
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

export const ADD_FAVORITE_BOOK_MUTATION = gql`
  mutation AddFavoriteBook($id: ID!, $bookId: ID!) {
    addFavoriteBook(id: $id, bookId: $bookId) {
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

export const REMOVE_FAVORITE_BOOK_MUTATION = gql`
  mutation RemoveFavoriteBook($id: ID!, $bookId: ID!) {
    removeFavoriteBook(id: $id, bookId: $bookId) {
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
