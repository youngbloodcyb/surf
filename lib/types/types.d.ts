type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

type Coordinates = {
  x: number;
  y: number;
};

type SurfSpot = {
  id: number;
  slug: string;
  description: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  coordinates: Coordinates;
  title: string;
};

type SurfSpotsProps = {
  spots: SurfSpot[];
};
