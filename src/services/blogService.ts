import clientFirebaseService from './clientFirebaseService';
import { blogPosts as staticBlogPosts, BlogPost } from '../data/blogData';

class BlogService {
  private collectionName = 'blogs';

  // Create a new blog post in Firebase
  async createBlog(blogData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    try {
      console.log('🔥 BlogService: Creating new blog post');
      const timestamp = new Date().toISOString();
      
      const blogPost = {
        ...blogData,
        publishDate: blogData.publishDate || timestamp.split('T')[0],
        createdAt: timestamp,
        updatedAt: timestamp,
        isStatic: false // Mark as dynamic blog from Firebase
      };

      const result = await clientFirebaseService.addDocument(this.collectionName, blogPost);
      console.log('✅ BlogService: Blog post created successfully', result.id);
      
      return {
        id: result.id,
        ...blogPost
      };
    } catch (error) {
      console.error('❌ BlogService: Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }

  // Get all blog posts (Firebase + Static)
  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      console.log('🔥 BlogService: Fetching all blog posts');
      
      // Fetch Firebase blogs
      const firebaseBlogs = await clientFirebaseService.getDocuments(this.collectionName, {
        orderByField: 'createdAt',
        orderByDirection: 'desc'
      });

      // Mark Firebase blogs as dynamic
      const dynamicBlogs = firebaseBlogs.map(blog => ({
        ...blog,
        isStatic: false
      }));

      // Mark static blogs
      const staticBlogs = staticBlogPosts.map(blog => ({
        ...blog,
        isStatic: true
      }));

      // Combine and sort by publish date (newest first)
      const allBlogs = [...dynamicBlogs, ...staticBlogs].sort((a, b) => {
        const dateA = new Date(a.publishDate || a.createdAt || '1970-01-01');
        const dateB = new Date(b.publishDate || b.createdAt || '1970-01-01');
        return dateB.getTime() - dateA.getTime();
      });

      console.log(`✅ BlogService: Retrieved ${allBlogs.length} blog posts (${dynamicBlogs.length} from Firebase, ${staticBlogs.length} static)`);
      return allBlogs;
    } catch (error) {
      console.error('❌ BlogService: Error fetching blog posts:', error);
      // Fallback to static blogs only if Firebase fails
      console.log('🔄 BlogService: Falling back to static blogs only');
      return staticBlogPosts.map(blog => ({ ...blog, isStatic: true }));
    }
  }

  // Get a single blog post by ID
  async getBlogById(id: string): Promise<BlogPost | null> {
    try {
      console.log(`🔥 BlogService: Fetching blog post with ID: ${id}`);
      
      // First check static blogs
      const staticBlog = staticBlogPosts.find(blog => blog.id === id);
      if (staticBlog) {
        console.log('✅ BlogService: Found static blog post');
        return { ...staticBlog, isStatic: true };
      }

      // Then check Firebase
      const firebaseBlog = await clientFirebaseService.getDocument(this.collectionName, id);
      if (firebaseBlog) {
        console.log('✅ BlogService: Found Firebase blog post');
        return { ...firebaseBlog, isStatic: false };
      }

      console.log('❌ BlogService: Blog post not found');
      return null;
    } catch (error) {
      console.error('❌ BlogService: Error fetching blog post:', error);
      return null;
    }
  }

  // Get blog post by slug
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      console.log(`🔥 BlogService: Fetching blog post with slug: ${slug}`);
      
      // First check static blogs
      const staticBlog = staticBlogPosts.find(blog => blog.slug === slug);
      if (staticBlog) {
        console.log('✅ BlogService: Found static blog post');
        return { ...staticBlog, isStatic: true };
      }

      // Then check Firebase
      const firebaseBlogs = await clientFirebaseService.getDocuments(this.collectionName, {
        whereConditions: [{ field: 'slug', operator: '==', value: slug }],
        limitCount: 1
      });

      if (firebaseBlogs.length > 0) {
        console.log('✅ BlogService: Found Firebase blog post');
        return { ...firebaseBlogs[0], isStatic: false };
      }

      console.log('❌ BlogService: Blog post not found');
      return null;
    } catch (error) {
      console.error('❌ BlogService: Error fetching blog post by slug:', error);
      return null;
    }
  }

  // Update a blog post (only Firebase blogs can be updated)
  async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      console.log(`🔥 BlogService: Updating blog post with ID: ${id}`);
      
      // Check if it's a static blog (cannot be updated)
      const staticBlog = staticBlogPosts.find(blog => blog.id === id);
      if (staticBlog) {
        throw new Error('Cannot update static blog posts');
      }

      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString(),
        isStatic: false
      };

      await clientFirebaseService.updateDocument(this.collectionName, id, updateData);
      
      // Fetch and return updated blog
      const updatedBlog = await clientFirebaseService.getDocument(this.collectionName, id);
      console.log('✅ BlogService: Blog post updated successfully');
      
      return updatedBlog ? { ...updatedBlog, isStatic: false } : null;
    } catch (error) {
      console.error('❌ BlogService: Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }

  // Delete a blog post (only Firebase blogs can be deleted)
  async deleteBlog(id: string): Promise<boolean> {
    try {
      console.log(`🔥 BlogService: Deleting blog post with ID: ${id}`);
      
      // Check if it's a static blog (cannot be deleted)
      const staticBlog = staticBlogPosts.find(blog => blog.id === id);
      if (staticBlog) {
        throw new Error('Cannot delete static blog posts');
      }

      await clientFirebaseService.deleteDocument(this.collectionName, id);
      console.log('✅ BlogService: Blog post deleted successfully');
      
      return true;
    } catch (error) {
      console.error('❌ BlogService: Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }

  // Get blogs by category
  async getBlogsByCategory(category: string): Promise<BlogPost[]> {
    try {
      console.log(`🔥 BlogService: Fetching blogs for category: ${category}`);
      
      // Get Firebase blogs by category
      const firebaseBlogs = await clientFirebaseService.getDocuments(this.collectionName, {
        whereConditions: [{ field: 'category', operator: '==', value: category }],
        orderByField: 'createdAt',
        orderByDirection: 'desc'
      });

      // Get static blogs by category
      const staticBlogs = staticBlogPosts.filter(blog => blog.category === category);

      // Combine and sort
      const categoryBlogs = [
        ...firebaseBlogs.map(blog => ({ ...blog, isStatic: false })),
        ...staticBlogs.map(blog => ({ ...blog, isStatic: true }))
      ].sort((a, b) => {
        const dateA = new Date(a.publishDate || a.createdAt || '1970-01-01');
        const dateB = new Date(b.publishDate || b.createdAt || '1970-01-01');
        return dateB.getTime() - dateA.getTime();
      });

      console.log(`✅ BlogService: Retrieved ${categoryBlogs.length} blogs for category ${category}`);
      return categoryBlogs;
    } catch (error) {
      console.error('❌ BlogService: Error fetching blogs by category:', error);
      // Fallback to static blogs only
      return staticBlogPosts
        .filter(blog => blog.category === category)
        .map(blog => ({ ...blog, isStatic: true }));
    }
  }

  // Get recent blogs
  async getRecentBlogs(limit: number = 5): Promise<BlogPost[]> {
    try {
      console.log(`🔥 BlogService: Fetching ${limit} recent blogs`);
      
      const allBlogs = await this.getAllBlogs();
      return allBlogs.slice(0, limit);
    } catch (error) {
      console.error('❌ BlogService: Error fetching recent blogs:', error);
      return staticBlogPosts.slice(0, limit).map(blog => ({ ...blog, isStatic: true }));
    }
  }

  // Search blogs
  async searchBlogs(searchTerm: string): Promise<BlogPost[]> {
    try {
      console.log(`🔥 BlogService: Searching blogs for: ${searchTerm}`);
      
      const allBlogs = await this.getAllBlogs();
      const searchLower = searchTerm.toLowerCase();
      
      const filteredBlogs = allBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        blog.category.toLowerCase().includes(searchLower)
      );

      console.log(`✅ BlogService: Found ${filteredBlogs.length} blogs matching search term`);
      return filteredBlogs;
    } catch (error) {
      console.error('❌ BlogService: Error searching blogs:', error);
      return [];
    }
  }
}

// Export singleton instance
const blogService = new BlogService();
export default blogService;
export { BlogService };