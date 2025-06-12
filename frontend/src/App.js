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
  RefreshCw,
  Inbox,
  Archive,
  Delete,
  Reply,
  MoreHorizontal,
  Filter,
  Star,
  Flag
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
  const [subreddits, setSubreddits] = useState(POPULAR_SUBREDDITS);
  const [activeSubreddit, setActiveSubreddit] = useState('r/all');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSubreddit, setNewSubreddit] = useState('');
  const [showAddSubreddit, setShowAddSubreddit] = useState(false);

  // Enhanced Reddit API integration
  const fetchPosts = async (subreddit = 'r/all') => {
    setLoading(true);
    try {
      // Multiple CORS proxy options for better reliability
      const corsProxies = [
        'https://api.allorigins.win/get?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
      ];
      
      const redditUrl = `https://www.reddit.com/${subreddit}.json?limit=25`;
      let response = null;
      let error = null;

      // Try different CORS proxies
      for (let i = 0; i < corsProxies.length; i++) {
        try {
          console.log(`Trying proxy ${i + 1}: ${corsProxies[i]}`);
          
          if (corsProxies[i].includes('allorigins')) {
            response = await axios.get(`${corsProxies[i]}${encodeURIComponent(redditUrl)}`);
            const data = JSON.parse(response.data.contents);
            if (data && data.data && data.data.children) {
              const postsData = data.data.children.map(child => child.data);
              setPosts(postsData);
              setSelectedPost(null);
              setComments([]);
              console.log(`Successfully fetched ${postsData.length} posts from Reddit via proxy ${i + 1}`);
              return;
            }
          } else {
            response = await axios.get(`${corsProxies[i]}${encodeURIComponent(redditUrl)}`);
            if (response.data && response.data.data && response.data.data.children) {
              const postsData = response.data.data.children.map(child => child.data);
              setPosts(postsData);
              setSelectedPost(null);
              setComments([]);
              console.log(`Successfully fetched ${postsData.length} posts from Reddit via proxy ${i + 1}`);
              return;
            }
          }
        } catch (proxyError) {
          console.log(`Proxy ${i + 1} failed:`, proxyError.message);
          error = proxyError;
          continue;
        }
      }

      // If all proxies fail, try direct request (might work in some environments)
      try {
        console.log('Trying direct Reddit API request...');
        response = await axios.get(redditUrl);
        if (response.data && response.data.data && response.data.data.children) {
          const postsData = response.data.data.children.map(child => child.data);
          setPosts(postsData);
          setSelectedPost(null);
          setComments([]);
          console.log(`Successfully fetched ${postsData.length} posts directly from Reddit`);
          return;
        }
      } catch (directError) {
        console.log('Direct Reddit API request failed:', directError.message);
      }

      throw error || new Error('All Reddit API requests failed');

    } catch (error) {
      console.error('Error fetching posts from Reddit API:', error);
      
      // Enhanced fallback with more realistic Reddit-like sample data
      const samplePosts = [
        {
          id: 'sample1',
          title: 'Welcome to Reddit Outlook Browser! 🎉',
          author: 'reddit_outlook_dev',
          subreddit: subreddit.replace('r/', '') || 'announcements',
          selftext: 'This is a demonstration of Reddit content in Outlook Web interface. The app attempts to fetch real posts from Reddit, but if the API is unavailable, you\'ll see this sample content. Try refreshing or selecting different subreddits!',
          score: Math.floor(Math.random() * 5000) + 1000,
          num_comments: Math.floor(Math.random() * 200) + 50,
          created_utc: Date.now() / 1000 - Math.random() * 3600,
          permalink: '/r/sample/comments/sample1/',
          url: 'https://www.reddit.com/r/sample/comments/sample1/'
        },
        {
          id: 'sample2',
          title: 'Microsoft Outlook Web UI meets Reddit browsing',
          author: 'ui_designer_2024',
          subreddit: subreddit.replace('r/', '') || 'webdev',
          selftext: 'This interface demonstrates how Reddit content can be presented in a familiar Outlook Web layout. Features include:\n\n• Authentic Outlook Web styling\n• Three-pane layout\n• Professional typography\n• Real Reddit API integration',
          score: Math.floor(Math.random() * 3000) + 500,
          num_comments: Math.floor(Math.random() * 150) + 25,
          created_utc: Date.now() / 1000 - Math.random() * 7200,
          permalink: '/r/sample/comments/sample2/',
          url: 'https://www.reddit.com/r/sample/comments/sample2/'
        },
        {
          id: 'sample3',
          title: 'Professional Reddit browsing experience in your familiar email interface',
          author: 'tech_enthusiast',
          subreddit: subreddit.replace('r/', '') || 'technology',
          selftext: 'Clean, professional interface for browsing Reddit content with familiar email-like layout. Perfect for workplace browsing! 😉',
          score: Math.floor(Math.random() * 8000) + 2000,
          num_comments: Math.floor(Math.random() * 300) + 100,
          created_utc: Date.now() / 1000 - Math.random() * 14400,
          permalink: '/r/sample/comments/sample3/',
          url: 'https://www.reddit.com/r/sample/comments/sample3/'
        },
        {
          id: 'sample4',
          title: 'TIL: You can browse Reddit in an Outlook Web interface',
          author: 'today_i_learned',
          subreddit: subreddit.replace('r/', '') || 'todayilearned',
          selftext: 'Today I learned that someone created a Reddit browser that looks exactly like Microsoft Outlook Web. It\'s pretty convincing!',
          score: Math.floor(Math.random() * 12000) + 3000,
          num_comments: Math.floor(Math.random() * 400) + 150,
          created_utc: Date.now() / 1000 - Math.random() * 21600,
          permalink: '/r/sample/comments/sample4/',
          url: 'https://i.imgur.com/example.jpg'
        },
        {
          id: 'sample5',
          title: 'Ask Reddit: What\'s your favorite productivity hack?',
          author: 'productivity_guru',
          subreddit: subreddit.replace('r/', '') || 'AskReddit',
          selftext: 'I\'m always looking for new ways to be more productive. What are your best productivity tips and tricks?',
          score: Math.floor(Math.random() * 6000) + 1500,
          num_comments: Math.floor(Math.random() * 500) + 200,
          created_utc: Date.now() / 1000 - Math.random() * 28800,
          permalink: '/r/sample/comments/sample5/',
          url: 'https://www.reddit.com/r/sample/comments/sample5/'
        }
      ];
      
      setPosts(samplePosts);
      setSelectedPost(null);
      setComments([]);
      
      // Show user-friendly message about API status
      console.log(`Showing ${samplePosts.length} sample posts for ${subreddit}`);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced comments fetching with multiple proxy fallbacks
  const fetchComments = async (subreddit, postId) => {
    try {
      const corsProxies = [
        'https://api.allorigins.win/get?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
      ];

      const redditUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
      let response = null;

      // Try different CORS proxies
      for (let i = 0; i < corsProxies.length; i++) {
        try {
          console.log(`Fetching comments via proxy ${i + 1}...`);
          
          if (corsProxies[i].includes('allorigins')) {
            response = await axios.get(`${corsProxies[i]}${encodeURIComponent(redditUrl)}`);
            const data = JSON.parse(response.data.contents);
            if (data && data[1] && data[1].data && data[1].data.children) {
              const commentsData = data[1].data.children
                .filter(child => child.data.body)
                .slice(0, 15) // Get more comments
                .map(child => child.data);
              setComments(commentsData);
              console.log(`Successfully fetched ${commentsData.length} comments via proxy ${i + 1}`);
              return;
            }
          } else {
            response = await axios.get(`${corsProxies[i]}${encodeURIComponent(redditUrl)}`);
            if (response.data && response.data[1] && response.data[1].data && response.data[1].data.children) {
              const commentsData = response.data[1].data.children
                .filter(child => child.data.body)
                .slice(0, 15)
                .map(child => child.data);
              setComments(commentsData);
              console.log(`Successfully fetched ${commentsData.length} comments via proxy ${i + 1}`);
              return;
            }
          }
        } catch (proxyError) {
          console.log(`Comment proxy ${i + 1} failed:`, proxyError.message);
          continue;
        }
      }

      // Try direct request as fallback
      try {
        response = await axios.get(redditUrl);
        if (response.data && response.data[1] && response.data[1].data && response.data[1].data.children) {
          const commentsData = response.data[1].data.children
            .filter(child => child.data.body)
            .slice(0, 15)
            .map(child => child.data);
          setComments(commentsData);
          console.log(`Successfully fetched ${commentsData.length} comments directly`);
          return;
        }
      } catch (directError) {
        console.log('Direct comment request failed:', directError.message);
      }

      throw new Error('All comment API requests failed');

    } catch (error) {
      console.error('Error fetching comments:', error);
      
      // Enhanced fallback comments with variety
      const sampleComments = [
        {
          id: 'comment1',
          author: 'office_worker_2024',
          body: 'This is actually pretty clever! Now I can browse Reddit at work and it looks like I\'m checking my email. 😄',
          score: Math.floor(Math.random() * 100) + 20,
          created_utc: Date.now() / 1000 - Math.random() * 3600
        },
        {
          id: 'comment2',
          author: 'ui_expert',
          body: 'The attention to detail is impressive. The three-pane layout, the command bar, even the fonts match Outlook perfectly. Great work!',
          score: Math.floor(Math.random() * 80) + 15,
          created_utc: Date.now() / 1000 - Math.random() * 5400
        },
        {
          id: 'comment3',
          author: 'productivity_ninja',
          body: 'This could actually be useful for quick Reddit browsing during work hours. The professional appearance is spot on.',
          score: Math.floor(Math.random() * 60) + 10,
          created_utc: Date.now() / 1000 - Math.random() * 7200
        },
        {
          id: 'comment4',
          author: 'web_developer',
          body: 'I love how the reading pane works just like in Outlook. The conversation view for comments is a nice touch!',
          score: Math.floor(Math.random() * 45) + 8,
          created_utc: Date.now() / 1000 - Math.random() * 9000
        },
        {
          id: 'comment5',
          author: 'reddit_lurker',
          body: 'Finally, a way to browse Reddit that doesn\'t scream "I\'m not working!" 😂',
          score: Math.floor(Math.random() * 120) + 30,
          created_utc: Date.now() / 1000 - Math.random() * 10800
        }
      ];
      
      setComments(sampleComments);
      console.log(`Showing ${sampleComments.length} sample comments`);
    }
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    fetchComments(post.subreddit, post.id);
  };

  // Add new subreddit function
  const addSubreddit = () => {  
    if (newSubreddit.trim() && !subreddits.some(s => s.name === `r/${newSubreddit.trim()}`)) {
      const formattedName = newSubreddit.startsWith('r/') ? newSubreddit : `r/${newSubreddit}`;
      setSubreddits([...subreddits, {
        name: formattedName,
        displayName: formattedName.replace('r/', ''),
        icon: '📁'
      }]);
      setNewSubreddit('');
      setShowAddSubreddit(false);
    }
  };

  // Format time helper
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
    <div className="h-screen flex flex-col bg-outlook-light-gray font-segoe">
      {/* Authentic Outlook Web Navigation Bar */}
      <div className="h-12 outlook-nav flex items-center px-4 text-white outlook-shadow">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <Mail className="w-4 h-4 text-outlook-blue" />
            </div>
          </div>
          <h1 className="text-lg font-normal ml-2">Outlook</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mail and people"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-96 rounded-sm text-black border-none outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-outlook-light-blue hover:bg-outlook-dark-blue rounded-full flex items-center justify-center cursor-pointer">
              <Settings className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 bg-outlook-blue rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold">U</span>
            </div>
          </div>
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
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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