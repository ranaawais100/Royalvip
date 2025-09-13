import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../data/blogData';
import { Plus, Edit, Trash2, Save, X, Eye, Calendar, Clock, Tag, AlertCircle, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useBlog } from '../hooks/useBlog';

const BlogAdmin: React.FC = () => {
  const navigate = useNavigate();
  const {
    blogs,
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    clearError,
    refreshBlogs
  } = useBlog();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Royal VIP Limos Team',
    tags: [],
    category: '',
    readTime: 5
  });

  const categories = ['Services', 'Events', 'Business', 'Behind the Scenes', 'Travel'];

  // Check authentication on component mount
  const login_check = () => {
    const token = localStorage.getItem('adminEmail');
    if (!token) {
      navigate('/admin/login');
      return false;
    }
    return true;
  }

  // Check authentication when component mounts
  useEffect(() => {
    login_check();
  }, [navigate]);
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'readTime' ? parseInt(value) || 0 : value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const publishDate = new Date().toISOString().split('T')[0];
      
      const blogData = {
        slug,
        title: formData.title!,
        excerpt: formData.excerpt!,
        content: formData.content!,
        featuredImage: formData.featuredImage || '/placeholder.svg',
        publishDate: editingPost?.publishDate || publishDate,
        author: formData.author!,
        tags: formData.tags || [],
        category: formData.category!,
        readTime: formData.readTime || 5
      };

      if (editingPost) {
        // Check if it's a static blog (cannot be updated)
        if (editingPost.isStatic) {
          alert('Cannot edit static blog posts. Only Firebase blogs can be edited.');
          return;
        }
        await updateBlog(editingPost.id, blogData);
      } else {
        await createBlog(blogData);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      ...post,
      tags: post.tags
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, isStatic?: boolean) => {
    if (isStatic) {
      alert('Cannot delete static blog posts. Only Firebase blogs can be deleted.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Royal VIP Limos Team',
      tags: [],
      category: '',
      readTime: 5
    });
    setEditingPost(null);
    setIsEditing(false);
    setShowPreview(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mx-4 mt-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button 
            onClick={clearError}
            className="ml-auto text-red-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">
              Blog <span className="text-yellow-400">Administration</span>
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Blog
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        {!isEditing && (
          <div className="mb-8 text-center">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Blog Management</h2>
              <p className="text-gray-400 mb-6">Create, edit, and manage your luxury automotive blog posts</p>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                <Plus className="w-6 h-6 mr-3" />
                Create New Blog Post
              </button>
            </div>
          </div>
        )}
        {/* Editor Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {showPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {!showPreview ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="Auto-generated from title"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content *
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={12}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Use HTML tags for formatting..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Read Time (minutes)
                        </label>
                        <input
                          type="number"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleInputChange}
                          min="1"
                          max="60"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Featured Image URL
                        </label>
                        <input
                          type="url"
                          name="featuredImage"
                          value={formData.featuredImage}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={formData.tags?.join(', ')}
                          onChange={handleTagsChange}
                          placeholder="Luxury, Transportation, Premium"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        {isSubmitting ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="prose prose-lg prose-invert max-w-none">
                    <h1>{formData.title}</h1>
                    <p className="text-gray-400 italic">{formData.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            <span className="ml-2 text-gray-400">Loading blogs...</span>
          </div>
        )}

        {/* Posts List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  {post.isStatic && (
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Static
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{post.author}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        post.isStatic 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      title={post.isStatic ? 'Cannot edit static posts' : 'Edit'}
                      disabled={post.isStatic}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.isStatic)}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        post.isStatic 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                      title={post.isStatic ? 'Cannot delete static posts' : 'Delete'}
                      disabled={post.isStatic}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">No blog posts yet</h3>
            <p className="text-gray-400 mb-8">
              Create your first blog post to get started.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;