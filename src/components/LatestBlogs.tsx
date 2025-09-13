import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';

interface LatestBlogsProps {
  count?: number;
  showTitle?: boolean;
  variant?: 'homepage' | 'footer';
}

const LatestBlogs: React.FC<LatestBlogsProps> = ({ 
  count = 3, 
  showTitle = true, 
  variant = 'homepage' 
}) => {
  const { blogs, loading, error } = useBlog();
  const latestBlogs = blogs.slice(0, count);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (variant === 'footer') {
    return (
      <div className="space-y-4">
        {showTitle && (
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            Latest Insights
          </h3>
        )}
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500 mx-auto"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">Unable to load articles</p>
          </div>
        )}
        {!loading && !error && (
          <div className="space-y-3">
            {latestBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="block group hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
            >
              <h4 className="text-white font-medium mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                {blog.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(blog.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {blog.readTime} min
                </span>
              </div>
            </Link>
            ))}
          </div>
        )}
        {!loading && !error && (
          <Link
            to="/blog"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 mt-4"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with our latest articles on luxury transportation, lifestyle tips, and industry insights.
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading latest articles...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Unable to Load Articles</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:transform hover:scale-105 group"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />

                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;