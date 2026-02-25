import { useState } from 'react'
import type { ActivityPost } from '../../types/entities'
import styles from './ActivityFeed.module.css'

interface ActivityFeedProps {
  entityType: string
  entityId: string
  posts?: ActivityPost[]
  onPost?: (content: string, type: ActivityPost['type']) => void
  onAttach?: (files: FileList | null) => void
}

export function ActivityFeed({
  entityType: _entityType,
  entityId: _entityId,
  posts = [],
  onPost,
  onAttach,
}: ActivityFeedProps) {
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<ActivityPost['type']>('update')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onPost?.(content.trim(), postType)
      setContent('')
    }
  }

  return (
    <div className={`card ${styles.feed}`}>
      <h3 className="section-title">Activity</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <select
            className="select"
            value={postType}
            onChange={(e) => setPostType(e.target.value as ActivityPost['type'])}
            aria-label="Activity type"
          >
            <option value="update">Post update</option>
            <option value="question">Ask question</option>
            <option value="share">Share with followers</option>
            <option value="comment">Comment</option>
          </select>
          <label className={styles.fileLabel}>
            <span className="btn btn-secondary">Attach files</span>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className={styles.fileInput}
              onChange={(e) => onAttach?.(e.target.files)}
              aria-label="Attach files"
            />
          </label>
        </div>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write an update, question, or comment…"
          rows={3}
          aria-label="Activity content"
        />
        <button type="submit" className="btn btn-primary" disabled={!content.trim()}>
          Post
        </button>
      </form>
      <ul className={styles.list} aria-label="Activity feed">
        {posts.length === 0 && (
          <li className={styles.empty}>No activity yet. Post an update above.</li>
        )}
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.author}>{post.authorName}</span>
              <span className={styles.type}>{post.type}</span>
              <time dateTime={post.createdAt} className={styles.time}>
                {new Date(post.createdAt).toLocaleString()}
              </time>
            </div>
            <p className={styles.content}>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
