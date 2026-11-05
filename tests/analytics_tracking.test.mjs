import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateOperationId,
  trackToolStarted,
  trackToolCompleted
} from '../lib/analytics.js';

test('Analytics: generates unique operation IDs', () => {
  const id1 = generateOperationId();
  const id2 = generateOperationId();
  assert.notStrictEqual(id1, id2, 'Operation IDs must be unique');
  assert.match(id1, /^\d+_[a-z0-9]+$/, 'Operation ID must match timestamp_random pattern');
});

test('Analytics: pushes events to dataLayer and prevents duplicates for same operationId', () => {
  // Mock window.dataLayer
  globalThis.window = { dataLayer: [] };

  const op1 = generateOperationId();
  trackToolStarted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op1
  });

  // Attempt duplicate start with same op1
  trackToolStarted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op1
  });

  assert.strictEqual(window.dataLayer.length, 1, 'Duplicate tool_started should be ignored');
  assert.deepStrictEqual(window.dataLayer[0], {
    event: 'tool_started',
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operation_id: op1
  });

  // Complete operation op1
  trackToolCompleted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op1
  });

  // Attempt duplicate completion with same op1
  trackToolCompleted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op1
  });

  assert.strictEqual(window.dataLayer.length, 2, 'Duplicate tool_completed should be ignored');
  assert.deepStrictEqual(window.dataLayer[1], {
    event: 'tool_completed',
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operation_id: op1
  });

  // Allow legitimate subsequent operation op2
  const op2 = generateOperationId();
  trackToolStarted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op2
  });
  trackToolCompleted({
    tool_name: 'jpg-to-excel',
    tool_category: 'document-conversion',
    operationId: op2
  });

  assert.strictEqual(window.dataLayer.length, 4, 'Subsequent operation op2 must be recorded');
  assert.strictEqual(window.dataLayer[2].operation_id, op2);
  assert.strictEqual(window.dataLayer[3].operation_id, op2);
});
