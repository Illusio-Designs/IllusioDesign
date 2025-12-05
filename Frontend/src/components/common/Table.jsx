'use client';

import '@/styles/components/common/Table.css';
import '@/styles/components/common/DashboardCommon.css';

export default function Table({ columns, data, onEdit, onDelete, actions = true, shouldShowEdit }) {
  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {actions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-state">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td>
                    <div className="action-cells">
                      {onEdit && (!shouldShowEdit || shouldShowEdit(row)) && (
                        <button
                          className="action-btn edit-btn"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3333 2.00001C11.5084 1.82491 11.7163 1.68602 11.9444 1.5913C12.1726 1.49659 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49659 13.3806 1.5913C13.6087 1.68602 13.8166 1.82491 13.9917 2.00001C14.1668 2.17511 14.3057 2.38305 14.4004 2.61119C14.4951 2.83933 14.5439 3.08301 14.5439 3.32918C14.5439 3.57535 14.4951 3.81903 14.4004 4.04717C14.3057 4.27531 14.1668 4.48325 13.9917 4.65835L5.32498 13.325L1.33331 14.6667L2.67498 10.675L11.3333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="action-btn delete-btn"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

