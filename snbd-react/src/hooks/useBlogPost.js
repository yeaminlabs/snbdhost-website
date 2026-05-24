import { useState, useEffect } from 'react';

export function useBlogPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    fetch(`/api/posts/${slug}`)
      .then(r => {
        if (r.status === 404) throw new Error('not_found');
        if (!r.ok) throw new Error('Failed to fetch post');
        return r.json();
      })
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
