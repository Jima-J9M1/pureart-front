// Common Strapi Image Format
export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Common Strapi Image
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Common Strapi Category
export interface StrapiCategory {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  Description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Common Strapi Tag
export interface StrapiTag {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  Description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Common Strapi Global
export interface StrapiGlobal {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  logo: StrapiImage;
  favicon: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Artwork Type
export interface Artwork {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  dimensions: string;
  Medium: string;
  Year: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  shortDescription: string;
  mainImage: StrapiImage;
  gallery: StrapiImage[] | null;
  category: StrapiCategory;
  tags: StrapiTag[];
}

// API Response Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Response Types
export type ArtworkResponse = StrapiResponse<Artwork[]>;
export type CategoryResponse = StrapiResponse<StrapiCategory[]>;
export type TagResponse = StrapiResponse<StrapiTag[]>;
export type GlobalResponse = StrapiResponse<StrapiGlobal>;

// Utility type for single item response
export type SingleItemResponse<T> = StrapiResponse<T>; 