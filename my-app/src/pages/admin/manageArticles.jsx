import { useEffect, useState } from 'react';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/articleService.js';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editingId && editingId !== 'new') {
        await updateArticle(editingId, formData);
      } else {
        await createArticle(formData);
      }

      setEditingId(null);
      setFormData({ title: '', body: '' });
      await fetchArticles();
      
      const successMessage = editingId && editingId !== 'new' 
        ? 'Article updated successfully' 
        : 'Article created successfully';
      setSuccess(successMessage);
      
      // Auto-dismiss success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.response?.data?.message || 'Failed to save article. Please try again.');
      
      // Auto-dismiss error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      body: article.body,
    });
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        setError(null);
        setSuccess(null);
        await deleteArticle(id);
        await fetchArticles();
        setSuccess('Article deleted successfully');
        
        // Auto-dismiss success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000);
      } catch (error) {
        console.error('Delete error:', error);
        setError(error.response?.data?.message || 'Failed to delete article.');
        
        // Auto-dismiss error message after 5 seconds
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Invalid Date';
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex h-screen">
      {/* LEFT — Articles List */}
      <div
        className={`p-6 overflow-y-auto transition-all duration-300 ${
          editingId ? 'w-3/5' : 'w-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Articles</h2>

          <button
            onClick={() => setEditingId('new')}
            className="bg-black text-white px-4 py-2"
          >
            Create Article
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="border border-black bg-red-50 p-3 mb-3">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="border border-black bg-green-50 p-3 mb-3">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {articles.map((article) => (
          <div key={article._id} className="border border-black p-3 mb-3">
            <h3 className="font-medium">{article.title}</h3>
            <p className="text-sm mt-2">
              {article.body.length > 150
                ? `${article.body.substring(0, 150)}...`
                : article.body}
            </p>
            
            <div className="text-xs mt-2 flex gap-4">
              <span>Author: {article.authorId?.name || 'Unknown'}</span>
              <span>Published: {formatDate(article.published)}</span>
            </div>

            <div className="flex gap-3 mt-3 text-sm">
              <button onClick={() => handleEdit(article)} className="underline">
                Edit
              </button>

              <button
                onClick={() => handleDelete(article._id)}
                className="underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <div className="border border-black p-4 text-center">
            No articles yet. Create your first article!
          </div>
        )}
      </div>

      {/* Divider */}
      {editingId && <div className="w-px bg-black" />}

      {/* RIGHT — Create / Edit */}
      {editingId && (
        <div className="w-2/5 p-6 transition-all duration-300 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="border border-black p-6 flex flex-col gap-4"
          >
            <h2 className="text-lg">
              {editingId === 'new' ? 'Create Article' : 'Edit Article'}
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Article Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border border-black p-2 outline-none"
            />

            <textarea
              name="body"
              placeholder="Article Body"
              value={formData.body}
              onChange={handleChange}
              required
              rows={12}
              className="border border-black p-2 outline-none resize-none"
            />

            <div className="flex gap-3">
              <button type="submit" className="bg-black text-white px-4 py-2">
                {editingId === 'new' ? 'Create' : 'Update'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: '', body: '' });
                }}
                className="border border-black px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
