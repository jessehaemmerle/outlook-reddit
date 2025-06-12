function loadPosts(subreddit) {
    fetch(`https://www.reddit.com/r/${subreddit}.json?limit=25`)
        .then(res => res.json())
        .then(data => {
            const postsElem = document.getElementById('posts');
            postsElem.innerHTML = '';
            data.data.children.forEach(item => {
                const post = item.data;
                const li = document.createElement('li');
                li.className = 'post-item';
                li.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-meta">by ${post.author} • ${new Date(post.created_utc*1000).toLocaleString()}</div>
                `;
                li.onclick = () => window.open(`https://reddit.com${post.permalink}`, '_blank');
                postsElem.appendChild(li);
            });
        })
        .catch(err => {
            console.error('Failed to load subreddit', err);
        });
}

document.getElementById('load').addEventListener('click', () => {
    const sub = document.getElementById('subreddit').value.trim();
    if (sub) loadPosts(sub);
});

document.querySelectorAll('#subreddit-list li').forEach(li => {
    li.addEventListener('click', () => {
        const sub = li.getAttribute('data-subreddit');
        loadPosts(sub);
    });
});

// Load default
loadPosts('popular');
