type CompanyLocation = {
  city: string;
  country: string;
  countryCode: string;
  region: string;
  state: string;
  subregion: string;
};

type Industry = {
  score: number;
  id: string;
  name: string;
  emoji: string;
  parent?: {
    emoji: string;
    id: string;
    name: string;
    slug: string;
  };
  slug: string;
};

type Company = {
  employees: string;
  foundedYear?: number;
  industries: Industry[];
  kind?: string;
  location: CompanyLocation;
};

type LogoFormat = {
  src: string;
  background?: string | null;
  format: string;
  size: number;
  height?: number;
  width?: number;
};

type Logos = {
  theme: string;
  formats: LogoFormat[];
  tags: any[];
  type: string;
};

type Link = {
  name: string;
  url: string;
};

type ImageFormat = {
  src: string;
  background?: string | null;
  format: string;
  size?: number;
  height?: number;
  width?: number;
};

type Image = {
  formats: ImageFormat[];
  tags: any[];
  type: string;
};

type Color = {
  hex: string;
  type: string;
  brightness: number;
};

type Font = {
  name: string;
  type: string;
  origin: string;
  originId?: any;
  weights: any[];
};

type Brand = {
  id: string;
  name: string;
  domain: string;
  claimed: boolean;
  description: string;
  longDescription: string;
  links: Link[];
  logos: Logos[];
  colors: Color[];
  fonts: Font[];
  images: Image[];
  qualityScore: number;
  company: Company;
  isNsfw: boolean;
};
