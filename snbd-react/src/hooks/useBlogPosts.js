import { useState, useEffect } from 'react';

export function useBlogPosts({ page = 1, limit = 9, category } = {}) {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit });
    if (category) params.set('category', category);

    fetch(`/api/posts?${params}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch posts');
        return r.json();
      })
      .then(data => {
        setPosts(data.posts || []);
        setTotal(data.total || 0);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, limit, category]);

  return { posts, total, loading, error };
}
