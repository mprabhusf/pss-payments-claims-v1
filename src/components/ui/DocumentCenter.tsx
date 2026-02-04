import { useState, useCallback } from 'react'
import styles from './DocumentCenter.module.css'

export interface UploadedFile {
  id: string
  name: string
  size?: string
  type?: string
  uploadedAt?: string
}

interface DocumentCenterProps {
  title?: string
  acceptedTypes?: string
  uploadButtonLabel?: string
  onFilesChange?: (files: UploadedFile[]) => void
  initialFiles?: UploadedFile[]
}

export function DocumentCenter({
  title = 'Document Center',
  acceptedTypes = 'PDF, JPG, PNG (max 10MB)',
  uploadButtonLabel,
  onFilesChange,
  initialFiles = [],
}: DocumentCenterProps) {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles)
  const [dragOver, setDragOver] = useState(false)

  const removeFile = useCallback(
    (id: string) => {
      const next = files.filter((f) => f.id !== id)
      setFiles(next)
      onFilesChange?.(next)
    },
    [files, onFilesChange]
  )

  const addFile = useCallback(
    (name: string) => {
      const newFile: UploadedFile = {
        id: `file-${Date.now()}`,
        name,
        size: '—',
        type: 'Document',
        uploadedAt: new Date().toLocaleDateString(),
      }
      const next = [...files, newFile]
      setFiles(next)
      onFilesChange?.(next)
    },
    [files, onFilesChange]
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const item = e.dataTransfer.files[0]
    if (item) addFile(item.name)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => setDragOver(false)

  return (
    <div className={styles.wrapper}>
      <h3 className="section-title">{title}</h3>
      <div
        className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className={styles.dropText}>Drag and drop files here, or click to upload</p>
        <p className="helper-text">{acceptedTypes}</p>
        {uploadButtonLabel && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: 'var(--space-3)' }}
            onClick={() => addFile('Document.pdf')}
          >
            {uploadButtonLabel}
          </button>
        )}
      </div>
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file) => (
            <li key={file.id} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.name}</span>
                <div className={styles.fileMeta}>
                  {file.type && <span>{file.type}</span>}
                  {file.uploadedAt && <span>{file.uploadedAt}</span>}
                </div>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(file.id)}
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
