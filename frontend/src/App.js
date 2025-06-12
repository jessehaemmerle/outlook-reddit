import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { 
  Search, 
  Mail, 
  Calendar, 
  Users, 
  Settings, 
  Plus,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

const POPULAR_SUBREDDITS = [
  { name: 'r/all', displayName: 'All Posts', icon: '🌐' },
  { name: 'r/popular', displayName: 'Popular', icon: '🔥' },
  { name: 'r/AskReddit', displayName: 'Ask Reddit', icon: '❓' },
  { name: 'r/funny', displayName: 'Funny', icon: '😂' },
  { name: 'r/pics', displayName: 'Pictures', icon: '📸' },
  { name: 'r/todayilearned', displayName: 'Today I Learned', icon: '🧠' },
  { name: 'r/worldnews', displayName: 'World News', icon: '🌍' },
  { name: 'r/technology', displayName: 'Technology', icon: '💻' },
  { name: 'r/programming', displayName: 'Programming', icon: '👨‍💻' },
  { name: 'r/science', displayName: 'Science', icon: '🔬' }
];

function App() {
  const [subreddits] = useState(POPULAR_SUBREDDITS);
  const [activeSubreddit, setActiveSubreddit] = useState('r/all');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async (subreddit = 'r/all') => {
    setLoading(true);
    try {
      // Using a CORS proxy to bypass Reddit's CORS restrictions
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const redditUrl = `https://www.reddit.com/${subreddit}.json?limit=25`;
      const response = await axios.get(`${proxyUrl}${encodeURIComponent(redditUrl)}`);
      
      // Parse the response since allorigins returns the data as a string
      const data = JSON.parse(response.data.contents);
      const postsData = data.data.children.map(child => child.data);
      setPosts(postsData);
      setSelectedPost(null);
      setComments([]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback with sample data for demo purposes
      const samplePosts = [
        {
          id: 'sample1',
          title: 'Welcome to Reddit Outlook Browser!',
          author: 'demo_user',
          subreddit: 'announcements',
          selftext: 'This is a demonstration post. In a real implementation, posts would be fetched from Reddit API.',
          score: 1234,
          num_comments: 45,
          created_utc: Date.now() / 1000,
          permalink: '/r/sample/comments/sample1/'
        },
        {
          id: 'sample2',
          title: 'Microsoft Outlook Web UI for Reddit',
          author: 'reddit_user',
          subreddit: 'webdev',
          selftext: 'This interface demonstrates how Reddit content can be presented in a familiar Outlook Web layout.',
          score: 567,
          num_comments: 23,
          created_utc: (Date.now() / 1000) - 3600,
          permalink: '/r/sample/comments/sample2/'
        },
        {
          id: 'sample3',
          title: 'Professional Reddit Browsing Experience',
          author: 'ui_designer',
          subreddit: 'design',
          selftext: 'Clean, professional interface for browsing Reddit content with familiar email-like layout.',
          score: 890,
          num_comments: 67,
          created_utc: (Date.now() / 1000) - 7200,
          permalink: '/r/sample/comments/sample3/'
        }
      ];
      setPosts(samplePosts);
      setSelectedPost(null);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (subreddit, postId) => {
    try {
      // Use CORS proxy for comments as well
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const redditUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
      const response = await axios.get(`${proxyUrl}${encodeURIComponent(redditUrl)}`);
      
      // Parse the response since allorigins returns the data as a string
      const data = JSON.parse(response.data.contents);
      const commentsData = data[1].data.children
        .filter(child => child.data.body)
        .slice(0, 10)
        .map(child => child.data);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Fallback with sample comments
      const sampleComments = [
        {
          id: 'comment1',
          author: 'user_1',
          body: 'This is a sample comment for demonstration purposes.',
          score: 42,
          created_utc: Date.now() / 1000
        },
        {
          id: 'comment2',
          author: 'user_2',
          body: 'Great interface! Really looks like Outlook Web.',
          score: 28,
          created_utc: (Date.now() / 1000) - 1800
        },
        {
          id: 'comment3',
          author: 'user_3',
          body: 'Professional looking design. Would love to see more features!',
          score: 15,
          created_utc: (Date.now() / 1000) - 3600
        }
      ];
      setComments(sampleComments);
    }
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    fetchComments(post.subreddit, post.id);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const formatContent = (text) => {
    if (!text) return '';
    return text.length > 300 ? text.substring(0, 300) + '...' : text;
  };

  useEffect(() => {
    fetchPosts(activeSubreddit);
  }, [activeSubreddit]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="h-12 bg-outlook-blue flex items-center px-4 text-white outlook-shadow">
        <div className="flex items-center space-x-6">
          <h1 className="text-lg font-semibold">Reddit</h1>
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5 cursor-pointer hover:bg-outlook-light-blue p-1 rounded" />
            <Calendar className="w-5 h-5 cursor-pointer hover:bg-outlook-light-blue p-1 rounded" />
            <Users className="w-5 h-5 cursor-pointer hover:bg-outlook-light-blue p-1 rounded" />
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Reddit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 rounded-md text-black border-none outline-none"
            />
          </div>
          <Settings className="w-5 h-5 cursor-pointer hover:bg-outlook-light-blue p-1 rounded" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-white border-r border-outlook-border flex flex-col">
          <div className="p-4 border-b border-outlook-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-outlook-text">Subreddits</h2>
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {subreddits.map((subreddit) => (
              <div
                key={subreddit.name}
                onClick={() => setActiveSubreddit(subreddit.name)}
                className={`sidebar-item px-4 py-2 flex items-center space-x-3 ${
                  activeSubreddit === subreddit.name ? 'active' : ''
                }`}
              >
                <span className="text-sm">{subreddit.icon}</span>
                <span className="text-sm text-outlook-text truncate">{subreddit.displayName}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="w-96 bg-white border-r border-outlook-border flex flex-col">
            <div className="h-12 px-4 flex items-center justify-between border-b border-outlook-border">
              <h3 className="text-base font-semibold text-outlook-text">
                {subreddits.find(s => s.name === activeSubreddit)?.displayName || 'Posts'}
              </h3>
              <button
                onClick={() => fetchPosts(activeSubreddit)}
                className="outlook-button p-1 rounded"
                disabled={loading}
              >
                <Refresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No posts found</div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostSelect(post)}
                    className={`post-item p-4 cursor-pointer ${
                      selectedPost?.id === post.id ? 'selected' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col items-center space-y-1">
                        <button className="text-gray-400 hover:text-orange-500">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-medium text-gray-600">
                          {post.score > 1000 ? `${(post.score / 1000).toFixed(1)}k` : post.score}
                        </span>
                        <button className="text-gray-400 hover:text-blue-500">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-outlook-text line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                          <span>r/{post.subreddit}</span>
                          <span>•</span>
                          <span>u/{post.author}</span>
                          <span>•</span>
                          <span>{formatTime(post.created_utc)}</span>
                        </div>
                        {post.selftext && (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {formatContent(post.selftext)}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span className="text-xs">{post.num_comments}</span>
                          </div>
                          {post.url && post.url !== `https://www.reddit.com${post.permalink}` && (
                            <ExternalLink className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col">
            {selectedPost ? (
              <>
                <div className="h-16 px-6 py-4 border-b border-outlook-border">
                  <h2 className="text-lg font-semibold text-outlook-text line-clamp-2">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                    <span>r/{selectedPost.subreddit}</span>
                    <span>•</span>
                    <span>u/{selectedPost.author}</span>
                    <span>•</span>
                    <span>{formatTime(selectedPost.created_utc)}</span>
                    <span>•</span>
                    <span>{selectedPost.score} upvotes</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
                  <div className="mb-8">
                    {selectedPost.selftext && (
                      <div className="reddit-content prose max-w-none mb-4">
                        <pre className="whitespace-pre-wrap font-sans text-sm">
                          {selectedPost.selftext}
                        </pre>
                      </div>
                    )}
                    
                    {selectedPost.url && selectedPost.url !== `https://www.reddit.com${selectedPost.permalink}` && (
                      <div className="mb-4">
                        {selectedPost.post_hint === 'image' || selectedPost.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <img 
                            src={selectedPost.url} 
                            alt={selectedPost.title}
                            className="max-w-full h-auto rounded-lg"
                          />
                        ) : (
                          <a 
                            href={selectedPost.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-outlook-blue hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View external link</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-outlook-text mb-4">
                      Comments ({selectedPost.num_comments})
                    </h3>
                    
                    {comments.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">
                        Loading comments...
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                              <span className="font-medium">u/{comment.author}</span>
                              <span>•</span>
                              <span>{comment.score} points</span>
                              <span>•</span>
                              <span>{formatTime(comment.created_utc)}</span>
                            </div>
                            <div className="reddit-content text-sm text-gray-700">
                              <pre className="whitespace-pre-wrap font-sans">
                                {comment.body}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a post to read</h3>
                  <p className="text-sm">Choose a post from the list to view its content and comments</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;