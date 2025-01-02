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

type Author = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

type FilterPostsProps = {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
};

type MobileLinkProps = LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

type SurfData = {
  direction: string;
  height: number;
  period: number;
  water_temperature: number;
};

type TideData = {
  height: number;
  time: string;
};

type SurfDataByLocation = {
  [key: string]: SurfData;
};

type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};
