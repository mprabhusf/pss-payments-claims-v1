import type { ReactNode } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  id: string
  header: ReactNode
  cell: (row: T) => ReactNode
}

interface DataTableProps<T> {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  showRecentlyViewedFilter?: boolean
  recentlyViewedChecked?: boolean
  onRecentlyViewedChange?: (checked: boolean) => void
  lastUpdated?: string
  columns: Column<T>[]
  rows: T[]
  bulkActions?: ReactNode
  getRowId: (row: T) => string
}

export function DataTable<T>({
  searchPlaceholder = 'Search…',
  searchValue = '',
  onSearchChange,
  showRecentlyViewedFilter,
  recentlyViewedChecked,
  onRecentlyViewedChange,
  lastUpdated,
  columns,
  rows,
  bulkActions,
  getRowId,
}: DataTableProps<T>) {
  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          {onSearchChange && (
            <input
              type="search"
              className="input"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search"
            />
          )}
        </div>
        <div className={styles.filters}>
          {showRecentlyViewedFilter && (
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={recentlyViewedChecked}
                onChange={(e) => onRecentlyViewedChange?.(e.target.checked)}
              />
              Recently viewed
            </label>
          )}
          {lastUpdated && <span>Last updated: {lastUpdated}</span>}
        </div>
        {bulkActions && <div className={styles.bulkActions}>{bulkActions}</div>}
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.id}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowId(row)}>
                {columns.map((col) => (
                  <td key={col.id} className={col.id === 'select' ? styles.checkboxCell : undefined}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
