import qs from 'qs';
import { 
  ArtworkResponse, 
  CategoryResponse, 
  TagResponse, 
  GlobalResponse,
  SingleItemResponse,
  StrapiCategory,
  ArtistResponse,
  Artist
} from '@/types/strapi';

const API_URL = process?.env?.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface FetchAPIParams {
  path: string;
  urlParamsObject?: Record<string, any>;
  options?: RequestInit;
}

export async function fetchAPI<T>({
  path,
  urlParamsObject = {},
  options = {}
}: FetchAPIParams): Promise<T> {
  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${API_URL}/api${path}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function getArtworks(params = {}) {
  const defaultParams = {
    populate: ['mainImage', 'category', 'tags'],
  };
  const mergedParams = {
    ...defaultParams,
    ...params,
  };
  return fetchAPI<ArtworkResponse>({
    path: '/artworks',
    urlParamsObject: mergedParams
  });
}

export async function getArtwork(slug: string) {
  const params = {
    filters: { slug },
    populate: ['mainImage', 'gallery', 'category', 'tags'],
  };
  return fetchAPI<ArtworkResponse>({
    path: '/artworks',
    urlParamsObject: params
  });
}

export async function getFeaturedArtworks(limit = 3) {
  const params = {
    filters: {
      featured: {
        $eq: true,
      },
    },
    populate: ['mainImage', 'category', 'tags'],
    pagination: {
      limit,
    },
  };
  return fetchAPI<ArtworkResponse>({
    path: '/artworks',
    urlParamsObject: params
  });
}

export async function getCategories(params = {}) {
  return fetchAPI<CategoryResponse>({
    path: '/categories',
    urlParamsObject: params
  });
}

export async function getCategory(slug: string) {
  const params = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['artworks', 'artworks.mainImage', 'artworks.category', 'artworks.tags'],
  };
  return fetchAPI<SingleItemResponse<StrapiCategory>>({
    path: '/categories',
    urlParamsObject: params
  });
}

export async function getTags(params = {}) {
  return fetchAPI<TagResponse>({
    path: '/tags',
    urlParamsObject: params
  });
}

export async function getGlobal() {
  const params = {
    populate: ['logo', 'favicon'],
  };
  return fetchAPI<GlobalResponse>({
    path: '/global-value',
    urlParamsObject: params
  });
}

export async function getArtists(params = {}) {
  const defaultParams = {
    populate: ['profileImage', 'featuredImage'],
  };
  const mergedParams = {
    ...defaultParams,
    ...params,
  };
  return fetchAPI<ArtistResponse>({
    path: '/artists',
    urlParamsObject: mergedParams
  });
}

export async function getArtist(slug: string) {
  const params = {
    filters: { slug },
    populate: [
      'profileImage',
      'featuredImage',
      'artworks',
      'artworks.mainImage',
      'artworks.category',
      'artworks.tags',
    ],
  };
  return fetchAPI<ArtistResponse>({
    path: '/artists',
    urlParamsObject: params
  });
} 