export interface Comment {
  rating: number;
  text: string;
}

export interface Item {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  imageUrl: string;
  detailedImages: string[];
  rating: number; // Średnia ocena
  comments: Comment[];
}
