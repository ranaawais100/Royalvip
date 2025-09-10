import { useState, useEffect, useCallback } from 'react';
import blogService from '../services/blogService';
import { BlogPost } from '../data/blogData';

interface UseBlogState {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  currentBlog: BlogPost | null;
}

interface UseBlogActions {
  // Data fetching
  fetchAllBlogs: () => Promise<void>;
  fetchBlogById: (id: string) => Promise<BlogPost | null>;
  fetchBlogBySlug: (slug: string) => Promise<BlogPost | null>;
  fetchBlogsByCategory: (category: string) => Promise<void>;
  fetchRecentBlogs: (limit?: number) => Promise<void>;
  searchBlogs: (searchTerm: string) => Promise<void>;
  
  // CRUD operations
  createBlog: (blogData: Omit<BlogPost, 'id'>) => Promise<BlogPost | null>;
  updateBlog: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost | null>;
  deleteBlog: (id: string) => Promise<boolean>;
  
  // State management
  setCurrentBlog: (blog: BlogPost | null) => void;
  clearError: () => void;
  refreshBlogs: () => Promise<void>;
  
  // Helper methods
  getBlogBySlug: (slug: string) => BlogPost | undefined;
  getRelatedBlogs: (currentBlogId: string, count?: number) => BlogPost[];
  getBlogsByCategory: (category: string) => BlogPost[];
}

type UseBlogReturn = UseBlogState & UseBlogActions;

export const useBlog = (): UseBlogReturn => {
  const [state, setState] = useState<UseBlogState>({
    blogs: [],
    loading: false,
    error: null,
    currentBlog: null
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setBlogs = useCallback((blogs: BlogPost[]) => {
    setState(prev => ({ ...prev, blogs }));
  }, []);

  const setCurrentBlog = useCallback((blog: BlogPost | null) => {
    setState(prev => ({ ...prev, currentBlog: blog }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Fetch all blogs
  const fetchAllBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const blogs = await blogService.getAllBlogs();
      setBlogs(blogs);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setBlogs]);

  // Fetch blog by ID
  const fetchBlogById = useCallback(async (id: string): Promise<BlogPost | null> => {
    try {
      setLoading(true);
      setError(null);
      const blog = await blogService.getBlogById(id);
      if (blog) {
        setCurrentBlog(blog);
      }
      return blog;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      setError('Failed to fetch blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setCurrentBlog]);

  // Fetch blog by slug
  const fetchBlogBySlug = useCallback(async (slug: string): Promise<BlogPost | null> => {
    try {
      setLoading(true);
      setError(null);
      const blog = await blogService.getBlogBySlug(slug);
      if (blog) {
        setCurrentBlog(blog);
      }
      return blog;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      setError('Failed to fetch blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setCurrentBlog]);

  // Fetch blogs by category
  const fetchBlogsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const blogs = await blogService.getBlogsByCategory(category);
      setBlogs(blogs);
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      setError('Failed to fetch blogs by category');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setBlogs]);

  // Fetch recent blogs
  const fetchRecentBlogs = useCallback(async (limit: number = 5) => {
    try {
      setLoading(true);
      setError(null);
      const blogs = await blogService.getRecentBlogs(limit);
      setBlogs(blogs);
    } catch (error) {
      console.error('Error fetching recent blogs:', error);
      setError('Failed to fetch recent blogs');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setBlogs]);

  // Search blogs
  const searchBlogs = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const blogs = await blogService.searchBlogs(searchTerm);
      setBlogs(blogs);
    } catch (error) {
      console.error('Error searching blogs:', error);
      setError('Failed to search blogs');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setBlogs]);

  // Create blog
  const createBlog = useCallback(async (blogData: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
    try {
      setLoading(true);
      setError(null);
      const newBlog = await blogService.createBlog(blogData);
      
      // Add to current blogs list
      setState(prev => ({
        ...prev,
        blogs: [newBlog, ...prev.blogs]
      }));
      
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('Failed to create blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Update blog
  const updateBlog = useCallback(async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedBlog = await blogService.updateBlog(id, updates);
      
      if (updatedBlog) {
        // Update in current blogs list
        setState(prev => ({
          ...prev,
          blogs: prev.blogs.map(blog => blog.id === id ? updatedBlog : blog),
          currentBlog: prev.currentBlog?.id === id ? updatedBlog : prev.currentBlog
        }));
      }
      
      return updatedBlog;
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Delete blog
  const deleteBlog = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const success = await blogService.deleteBlog(id);
      
      if (success) {
        // Remove from current blogs list
        setState(prev => ({
          ...prev,
          blogs: prev.blogs.filter(blog => blog.id !== id),
          currentBlog: prev.currentBlog?.id === id ? null : prev.currentBlog
        }));
      }
      
      return success;
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Failed to delete blog');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Refresh blogs (re-fetch all)
  const refreshBlogs = useCallback(async () => {
    await fetchAllBlogs();
  }, [fetchAllBlogs]);

  // Helper methods
  const getBlogBySlug = useCallback((slug: string): BlogPost | undefined => {
    return state.blogs.find(post => post.slug === slug);
  }, [state.blogs]);

  const getRelatedBlogs = useCallback((currentBlogId: string, count: number = 3): BlogPost[] => {
    const currentBlog = state.blogs.find(post => post.id === currentBlogId);
    if (!currentBlog) return [];
    
    return state.blogs
      .filter(post => 
        post.id !== currentBlogId && 
        (post.category === currentBlog.category || 
         post.tags.some(tag => currentBlog.tags.includes(tag)))
      )
      .slice(0, count);
  }, [state.blogs]);

  const getBlogsByCategoryHelper = useCallback((category: string): BlogPost[] => {
    return state.blogs.filter(post => post.category === category);
  }, [state.blogs]);

  // Auto-fetch blogs on mount
  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  return {
    // State
    blogs: state.blogs,
    loading: state.loading,
    error: state.error,
    currentBlog: state.currentBlog,
    
    // Actions
    fetchAllBlogs,
    fetchBlogById,
    fetchBlogBySlug,
    fetchBlogsByCategory,
    fetchRecentBlogs,
    searchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    setCurrentBlog,
    clearError,
    refreshBlogs,
    
    // Helper methods
    getBlogBySlug,
    getRelatedBlogs,
    getBlogsByCategory: getBlogsByCategoryHelper
  };
};

export default useBlog;