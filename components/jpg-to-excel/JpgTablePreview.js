'use client';

import { useState } from 'react';
import {
  Table as TableIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Edit3,
  Layers,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function JpgTablePreview({
  headers = [],
  rows = [],
  tables = [],
  activeTableIndex = 0,
  uncertainCells = [],
  onSelectTable,
  onTableChange,
}) {
  const [copied, setCopied] = useState(false);

  const getColLetter = (index) => {
    return String.fromCharCode(65 + (index % 26));
  };

  // Fast set lookup for uncertain coordinates: `${row}_${col}`
  const uncertainMap = new Map();
  if (Array.isArray(uncertainCells)) {
    uncertainCells.forEach((u) => {
      uncertainMap.set(`${u.row}_${u.col}`, u.reason || 'Uncertain transcription');
    });
  }

  const handleHeaderChange = (colIdx, value) => {
    const newHeaders = [...headers];
    newHeaders[colIdx] = value;
    onTableChange({ headers: newHeaders, rows });
  };

  const handleCellChange = (rowIdx, colIdx, value) => {
    const newRows = rows.map((r, rIdx) => {
      if (rIdx !== rowIdx) return r;
      const newRow = [...r];
      newRow[colIdx] = value;
      return newRow;
    });
    onTableChange({ headers, rows: newRows });
  };

  const handleAddRow = () => {
    const numCols = Math.max(headers.length, rows[0]?.length || 1);
    const newRow = new Array(numCols).fill('');
    onTableChange({ headers, rows: [...rows, newRow] });
  };

  const handleAddColumn = () => {
    const newHeaders = [...headers, `Column ${headers.length + 1}`];
    const newRows = rows.map((r) => [...r, '']);
    onTableChange({ headers: newHeaders, rows: newRows });
  };

  const handleDeleteRow = (rowIdx) => {
    const newRows = rows.filter((_, idx) => idx !== rowIdx);
    onTableChange({ headers, rows: newRows });
  };

  const handleCopyClipboard = async () => {
    const allRows = [headers, ...rows];
    const tsv = allRows.map((r) => r.join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(tsv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  const totalCols = Math.max(headers.length, rows[0]?.length || 0);
  const totalRows = (headers.length > 0 ? 1 : 0) + rows.length;
  const hasMultipleTables = tables && tables.length > 1;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
      {/* Multi-Table Tabs Header (if 2+ tables detected) */}
      {hasMultipleTables && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Detected Tables ({tables.length}):
          </span>
          {tables.map((tbl, idx) => {
            const isActive = idx === activeTableIndex;
            const tableName = tbl.name || `Table ${idx + 1}`;
            const tRows = tbl.rows?.length || 0;
            const tCols = tbl.headers?.length || 0;
            return (
              <button
                key={tbl.id || idx}
                type="button"
                onClick={() => onSelectTable && onSelectTable(idx)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5',
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 border border-slate-200/60'
                )}
              >
                <span>{tableName}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-md font-mono',
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-500'
                  )}
                >
                  {tRows}×{tCols}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-100">
            <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {totalRows} Rows × {totalCols} Cols
            </span>
          </div>

          {uncertainMap.size > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium border border-amber-200">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>{uncertainMap.size} uncertain {uncertainMap.size === 1 ? 'cell' : 'cells'} flagged</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400">
            <Edit3 className="w-3 h-3" />
            <span>Click any cell to edit</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddColumn}
            className="h-8 px-2.5 text-xs text-slate-600 hover:text-slate-900 border-slate-200"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Add Col
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddRow}
            className="h-8 px-2.5 text-xs text-slate-600 hover:text-slate-900 border-slate-200"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Add Row
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyClipboard}
            className={cn(
              'h-8 px-2.5 text-xs transition-colors border-slate-200',
              copied ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" />
                Copy TSV
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Spreadsheet Grid Container */}
      <div className="relative border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto max-h-[460px] overflow-y-auto no-scrollbar">
          <table className="w-full text-xs text-left border-collapse select-text">
            {/* Column Letter Coordinate Row */}
            <thead className="sticky top-0 z-20 bg-slate-100 text-slate-500 border-b border-slate-300">
              <tr>
                <th className="w-10 px-2 py-1 text-center bg-slate-200/90 text-slate-400 font-mono text-[10px] border-r border-slate-300">
                  #
                </th>
                {headers.map((_, colIdx) => (
                  <th
                    key={colIdx}
                    className="px-3 py-1 font-mono text-center font-bold text-slate-500 border-r border-slate-200/80 bg-slate-100"
                  >
                    {getColLetter(colIdx)}
                  </th>
                ))}
                <th className="w-10 bg-slate-100"></th>
              </tr>

              {/* Editable Header Row */}
              <tr className="bg-emerald-700 text-white border-b-2 border-emerald-800">
                <th className="w-10 px-2 py-2 text-center bg-emerald-800 text-emerald-100 font-mono text-[11px] border-r border-emerald-800">
                  1
                </th>
                {headers.map((header, colIdx) => (
                  <th
                    key={colIdx}
                    className="p-0 border-r border-emerald-600/70 min-w-[130px] font-semibold tracking-wide"
                  >
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => handleHeaderChange(colIdx, e.target.value)}
                      placeholder={`Col ${colIdx + 1}`}
                      className="w-full bg-transparent px-3 py-2 text-white font-bold placeholder:text-emerald-300/70 focus:bg-emerald-600 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                    />
                  </th>
                ))}
                <th className="w-10 bg-emerald-800"></th>
              </tr>
            </thead>

            {/* Editable Data Rows */}
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((row, rowIdx) => {
                const isEven = rowIdx % 2 === 0;
                return (
                  <tr
                    key={rowIdx}
                    className={cn(
                      'group transition-colors',
                      isEven ? 'bg-white' : 'bg-slate-50/70',
                      'hover:bg-emerald-50/40'
                    )}
                  >
                    {/* Row Index */}
                    <td className="w-10 px-2 py-1 text-center font-mono text-[10px] text-slate-400 bg-slate-100/70 border-r border-slate-200">
                      {rowIdx + 2}
                    </td>

                    {/* Data Cells */}
                    {headers.map((_, colIdx) => {
                      const cellKey = `${rowIdx}_${colIdx}`;
                      const isUncertain = uncertainMap.has(cellKey);
                      const uncertainReason = uncertainMap.get(cellKey);
                      const cellVal = row[colIdx] ?? '';

                      return (
                        <td
                          key={colIdx}
                          title={isUncertain ? `Gemini Note: ${uncertainReason}` : undefined}
                          className={cn(
                            'p-0 border-r border-slate-200 relative min-w-[130px]',
                            isUncertain && 'bg-amber-50/90'
                          )}
                        >
                          <input
                            type="text"
                            value={cellVal}
                            onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                            className={cn(
                              'w-full bg-transparent px-3 py-2 text-slate-800 placeholder:text-slate-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors',
                              isUncertain && 'text-amber-950 font-medium'
                            )}
                          />
                          {isUncertain && (
                            <span
                              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 pointer-events-none"
                              title={uncertainReason}
                            />
                          )}
                        </td>
                      );
                    })}

                    {/* Delete Row Action */}
                    <td className="w-10 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(rowIdx)}
                        title="Delete this row"
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1 rounded-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
