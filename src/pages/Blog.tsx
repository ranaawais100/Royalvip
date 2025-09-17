import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blogData';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import { useBlog } from '../hooks/useBlog';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { blogs, loading, error } = useBlog();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(blogs.map(post => post.category)))];

  // Filter blogs based on category and search term
  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Luxury Automotive Blog - Royal VIP Limos"
        description="Discover the latest insights on luxury transportation, premium car services, and exclusive automotive experiences. Stay updated with Royal VIP Limos blog."
        keywords="luxury automotive blog, premium car services, VIP transportation, luxury travel, chauffeur insights, automotive news"
        url="https://royalviplimos.com/blog"
        type="website"
      />
      <Navigation />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Luxury Insights
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the world of premium transportation, luxury lifestyle, and exclusive insights from our expert team.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Error Loading Articles</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:transform hover:scale-105 group"
            >
              {/* Featured Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />

                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              </article>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Blog;