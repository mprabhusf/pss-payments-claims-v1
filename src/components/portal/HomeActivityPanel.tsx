import { useState } from 'react'
import styles from './HomeActivityPanel.module.css'

interface ActivityEntry {
  id: string
  userName: string
  timestamp: string
  content: string
  mentions?: string[]
  hasAttachment?: boolean
}

const MOCK_ACTIVITY: ActivityEntry[] = [
  {
    id: '1',
    userName: 'David Blake',
    timestamp: '2 hours ago',
    content: 'Completed review for case REF-1001. @Amy Huffman please follow up on the finance coaching schedule.',
    mentions: ['@Amy Huffman'],
  },
  {
    id: '2',
    userName: 'Sarah Chen',
    timestamp: '5 hours ago',
    content: 'Attached the latest assessment document for Susan Marshal.',
    hasAttachment: true,
  },
  {
    id: '3',
    userName: 'Mike Torres',
    timestamp: 'Yesterday, 3:45 PM',
    content: 'Referral REF-1003 has been assigned. Case-related notes added to the file.',
  },
]

export function HomeActivityPanel() {
  const [activeTab, setActiveTab] = useState<'post' | 'question'>('post')
  const [shareText, setShareText] = useState('')
  const [filter, setFilter] = useState('Most Recent Activity')

  return (
    <aside className={styles.panel} aria-label="Activity">
      <h2 className={styles.panelTitle}>Activity</h2>

      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'post'}
          className={activeTab === 'post' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('post')}
        >
          Post
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'question'}
          className={activeTab === 'question' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('question')}
        >
          Question
        </button>
        <div className={styles.tabMore}>
          <select className={styles.selectSmall} aria-label="More options">
            <option>More</option>
          </select>
        </div>
      </div>

      <div className={styles.composer}>
        <div className={styles.composerTo}>
          <label htmlFor="activity-to" className={styles.composerLabel}>To:</label>
          <select id="activity-to" className="select" defaultValue="all">
            <option value="all">All Follower</option>
          </select>
        </div>
        <textarea
          className={`textarea ${styles.composerInput}`}
          placeholder="Share an Update"
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
          rows={3}
          aria-label="Share an update"
        />
        <div className={styles.composerActions}>
          <div className={styles.formatIcons} aria-hidden>
            <button type="button" className={styles.iconBtn} title="Text formatting" aria-label="Format">B</button>
            <button type="button" className={styles.iconBtn} title="Attach file" aria-label="Attach file">📎</button>
            <button type="button" className={styles.iconBtn} title="Mention" aria-label="Mention">@</button>
            <button type="button" className={styles.iconBtn} title="Hashtag" aria-label="Hashtag">#</button>
          </div>
          <button type="button" className="btn btn-primary" disabled={!shareText.trim()}>
            Share
          </button>
        </div>
      </div>

      <div className={styles.feedSection}>
        <div className={styles.feedHeader}>
          <select
            className="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Activity filter"
          >
            <option>Most Recent Activity</option>
            <option>All Activity</option>
          </select>
        </div>
        <ul className={styles.feedList}>
          {MOCK_ACTIVITY.map((entry) => (
            <li key={entry.id} className={styles.feedItem}>
              <div className={styles.feedItemHeader}>
                <div className={styles.avatar} aria-hidden>{entry.userName.slice(0, 2).toUpperCase()}</div>
                <div className={styles.feedItemMeta}>
                  <span className={styles.feedUserName}>{entry.userName}</span>
                  <span className={styles.feedTime}>{entry.timestamp}</span>
                </div>
              </div>
              <p className={styles.feedContent}>{entry.content}</p>
              {entry.hasAttachment && (
                <p className={styles.attachmentNote}>📎 Attachment</p>
              )}
              <input
                type="text"
                className={`input ${styles.commentInput}`}
                placeholder="Write a comment…"
                aria-label="Comment"
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
