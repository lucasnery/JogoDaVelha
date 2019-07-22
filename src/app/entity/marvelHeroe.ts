export interface MarvelHero {
  name: string;
  description: string;
  thumbnail: {
    path: string,
    extension: string
  };

  [propName: string]: any;
}
