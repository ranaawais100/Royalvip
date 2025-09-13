import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '../data/blogData';
import { Calendar, Clock, User, Tag, ArrowLeft, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import { useBlog } from '../hooks/useBlog';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogs, loading, error, getBlogBySlug, getRelatedBlogs } = useBlog();
  const [blog, setBlog] = useState<BlogPost | undefined>(undefined);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slug && blogs.length > 0) {
      const foundBlog = getBlogBySlug(slug);
      if (foundBlog) {
        setBlog(foundBlog);
        setRelatedBlogs(getRelatedBlogs(foundBlog.id));
        // Find current blog index for navigation
        const index = blogs.findIndex(post => post.slug === slug);
        setCurrentIndex(index);
        // Scroll to top when blog changes
        window.scrollTo(0, 0);
      } else {
        setBlog(undefined);
      }
    }
  }, [slug, blogs, getBlogBySlug, getRelatedBlogs]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold mb-4">Error Loading Article</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Blog not found
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPreviousBlog = () => {
    return currentIndex > 0 ? blogs[currentIndex - 1] : null;
  };

  const getNextBlog = () => {
    return currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title={blog?.title}
        description={blog?.excerpt}
        keywords={`${blog?.tags?.join(', ')}, luxury automotive, premium car services, VIP transportation`}
        image={blog?.featuredImage}
        url={`https://royalviplimos.com/blog/${blog?.slug}`}
        type="article"
        publishedTime={blog?.publishDate ? new Date(blog.publishDate).toISOString() : undefined}
        author={blog?.author}
        section={blog?.category}
        tags={blog?.tags}
      />
      <Navigation />
      {/* Back Navigation */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />

        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold">
            {blog.category}
          </span>
        </div>

        {/* Share Button */}
        <div className="absolute top-8 right-8">
          <button
            onClick={handleShare}
            className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
            title="Share this article"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blog.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full"
              >
                <Tag className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-yellow-500 pl-6 italic">
            {blog.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg prose-invert max-w-none"
          style={{
            '--tw-prose-body': 'rgb(209 213 219)',
            '--tw-prose-headings': 'rgb(255 255 255)',
            '--tw-prose-lead': 'rgb(156 163 175)',
            '--tw-prose-links': 'rgb(250 204 21)',
            '--tw-prose-bold': 'rgb(255 255 255)',
            '--tw-prose-counters': 'rgb(156 163 175)',
            '--tw-prose-bullets': 'rgb(75 85 99)',
            '--tw-prose-hr': 'rgb(55 65 81)',
            '--tw-prose-quotes': 'rgb(255 255 255)',
            '--tw-prose-quote-borders': 'rgb(250 204 21)',
            '--tw-prose-captions': 'rgb(156 163 175)',
            '--tw-prose-code': 'rgb(255 255 255)',
            '--tw-prose-pre-code': 'rgb(209 213 219)',
            '--tw-prose-pre-bg': 'rgb(17 24 39)',
            '--tw-prose-th-borders': 'rgb(55 65 81)',
            '--tw-prose-td-borders': 'rgb(55 65 81)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Navigation Between Posts */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            {/* Previous Post */}
            <div className="flex-1">
              {getPreviousBlog() && (
                <Link
                  to={`/blog/${getPreviousBlog()!.slug}`}
                  className="group flex items-center text-left hover:text-yellow-400 transition-colors duration-300"
                >
                  <ChevronLeft className="w-6 h-6 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Previous</div>
                    <div className="font-semibold line-clamp-2">{getPreviousBlog()!.title}</div>
                  </div>
                </Link>
              )}
            </div>

            {/* Next Post */}
            <div className="flex-1 text-right">
              {getNextBlog() && (
                <Link
                  to={`/blog/${getNextBlog()!.slug}`}
                  className="group flex items-center justify-end text-right hover:text-yellow-400 transition-colors duration-300"
                >
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Next</div>
                    <div className="font-semibold line-clamp-2">{getNextBlog()!.title}</div>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:transform hover:scale-105 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedBlog.featuredImage}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />

                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>{formatDate(relatedBlog.publishDate)}</span>
                      <span>{relatedBlog.readTime} min read</span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {relatedBlog.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${relatedBlog.slug}`}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;