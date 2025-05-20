import qs from 'qs';
import { 
  ArtworkResponse, 
  CategoryResponse, 
  TagResponse, 
  GlobalResponse,
  SingleItemResponse,
  StrapiCategory,
  ArtistResponse
} from '@/types/strapi';

const API_URL = process?.env?.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface FetchAPIParams {
  path: string;
  urlParamsObject?: Record<string, unknown>;
  options?: RequestInit;
}

interface APIResponse<T> {
  data: T | null;
  error: {
    message: string;
    status?: number;
    statusText?: string;
    details?: unknown;
  } | null;
}

export async function fetchAPI<T>({
  path,
  urlParamsObject = {},
  options = {}
}: FetchAPIParams): Promise<APIResponse<T>> {
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
      const errorData = await response.json().catch(() => null);
      return {
        data: null,
        error: {
          message: 'API request failed',
          status: response.status,
          statusText: response.statusText,
          details: errorData
        }
      };
    }
    
    const data = await response.json();
    return {
      data: data as T,
      error: null
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        return {
          data: null,
          error: {
            message: 'Unable to connect to the API server. Please ensure the server is running.',
            status: 503,
            statusText: 'Service Unavailable'
          }
        };
      }
      return {
        data: null,
        error: {
          message: 'An unexpected error occurred while fetching data',
          status: 500,
          statusText: 'Internal Server Error',
          details: error.message
        }
      };
    }

    return {
      data: null,
      error: {
        message: 'An unknown error occurred',
        status: 500,
        statusText: 'Internal Server Error'
      }
    };
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
    populate: ['profileImage', 'featuredImage', 'artworks', 'artworks.mainImage', 'artworks.category', 'artworks.tags'],
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