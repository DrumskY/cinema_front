export interface CommentAuthorType {
  userId: number;
  username: string;
}

export interface MovieCommentType {
  commentId: number;
  authorCommId: number;
  comment: string;
  author: CommentAuthorType;
}

export interface MovieDetailType {
  movieId: number;
  name: string;
  type: string;
  movietime: string;
  direction: string;
  image: string;
  imagedesc: string;
  rating: number;
  description: string;
  movieComment: MovieCommentType[];
}
