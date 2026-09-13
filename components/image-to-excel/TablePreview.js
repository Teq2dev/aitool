'use client';

import { useState } from 'react';
import { Table, Plus, Trash2, Copy, Check, Edit3, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TablePreview({
  headers = [],
  rows = [],
  tables = [],
  activeTableIndex = 0,
  onSelectTable,
  onTableChange,
}) {
  const [copied, setCopied] = useState(false);

  const getColLetter = (index) => {
    return String.fromCharCode(65 + (index % 26));
  };

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
      // ignore
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
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Detected Tables ({tables.length}):
          </span>
          {tables.map((tbl, idx) => {
            const isActive = idx === activeTableIndex;
            const tableName = tbl.name || `Table ${idx + 1}`;
            return (
              <button
                key={tbl.id || idx}
                type="button"
                onClick={() => onSelectTable && onSelectTable(idx)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 border border-slate-200/60'
                )}
              >
                <span>{tableName}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-md font-mono',
                    isActive ? 'bg-blue-700/60 text-blue-100' : 'bg-slate-200 text-slate-500'
                  )}
                >
                  {tbl.rowCount || tbl.rows.length + 1}R × {tbl.colCount || tbl.headers.length}C
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {hasMultipleTables
                ? `Table ${activeTableIndex + 1}: ${tables[activeTableIndex]?.name || 'Data Grid'}`
                : 'Extracted Spreadsheet Preview'}
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <Edit3 className="w-2.5 h-2.5" /> Editable Cells
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Click any cell to edit contents before exporting to Excel.
            </p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
            {totalRows} Rows × {totalCols} Cols
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyClipboard}
            className="h-8 text-xs font-bold gap-1.5 rounded-xl cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                Copy Data
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Spreadsheet Grid Container */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto max-h-[380px] overflow-y-auto no-scrollbar">
          <table className="w-full text-xs text-left border-collapse">
            {/* Column Alphabet Index Header */}
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-400 font-mono text-[10px]">
                <th className="w-10 px-2 py-1.5 text-center border-r border-slate-200 bg-slate-200/50">#</th>
                {Array.from({ length: totalCols }).map((_, cIdx) => (
                  <th key={cIdx} className="px-3 py-1.5 text-center border-r border-slate-200 last:border-r-0 font-bold">
                    {getColLetter(cIdx)}
                  </th>
                ))}
                <th className="w-8 px-2 py-1 text-center"></th>
              </tr>

              {/* Table Data Headers */}
              {headers && headers.length > 0 && (
                <tr className="bg-blue-600 text-white font-bold border-b border-blue-700">
                  <td className="px-2 py-2 text-center border-r border-blue-500/50 text-[10px] font-mono opacity-70">1</td>
                  {headers.map((h, cIdx) => (
                    <td key={cIdx} className="p-0 border-r border-blue-500/40 last:border-r-0">
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => handleHeaderChange(cIdx, e.target.value)}
                        className="w-full h-full px-3 py-2 bg-transparent text-white font-bold text-xs focus:outline-none focus:bg-blue-700 transition-colors"
                      />
                    </td>
                  ))}
                  <td className="w-8"></td>
                </tr>
              )}
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-slate-200 font-normal text-slate-800">
              {rows.map((row, rIdx) => {
                const rowNum = (headers.length > 0 ? 2 : 1) + rIdx;
                const isEven = rIdx % 2 === 0;

                return (
                  <tr key={rIdx} className={cn('hover:bg-blue-50/40 transition-colors group', isEven ? 'bg-white' : 'bg-slate-50/70')}>
                    <td className="px-2 py-1 text-center border-r border-slate-200 text-slate-400 font-mono text-[10px] select-none bg-slate-100/50">
                      {rowNum}
                    </td>

                    {Array.from({ length: totalCols }).map((_, cIdx) => (
                      <td key={cIdx} className="p-0 border-r border-slate-200/80 last:border-r-0">
                        <input
                          type="text"
                          value={row[cIdx] || ''}
                          onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                          className="w-full h-full px-3 py-1.5 bg-transparent text-slate-800 text-xs focus:outline-none focus:bg-blue-50 focus:ring-1 focus:ring-inset focus:ring-blue-500 transition-all font-sans"
                        />
                      </td>
                    ))}

                    {/* Delete row action */}
                    <td className="w-8 px-1 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(rIdx)}
                        title="Delete row"
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
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

      {/* Grid Modification Bar */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRow}
          className="text-xs font-semibold h-8 rounded-xl gap-1 text-slate-700 hover:text-blue-600 border-slate-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Row
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddColumn}
          className="text-xs font-semibold h-8 rounded-xl gap-1 text-slate-700 hover:text-blue-600 border-slate-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Column
        </Button>
      </div>
    </div>
  );
}
