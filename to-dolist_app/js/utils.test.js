import { describe, it, expect } from 'vitest';
import { getRemainingCount, applyFilter } from './utils.js';

describe('getRemainingCount', () => {
    it('counts only incomplete todos', () => {
        const todos = [
            { id: 1, text: 'A', completed: false },
            { id: 2, text: 'B', completed: true },
            { id: 3, text: 'C', completed: false },
        ];
        expect(getRemainingCount(todos)).toBe(2);
    });

    it('returns 0 for an empty array (edge case)', () => {
        expect(getRemainingCount([])).toBe(0);
    });
});

describe('applyFilter', () => {
    const todos = [
        { id: 1, text: 'A', completed: false },
        { id: 2, text: 'B', completed: true },
    ];

    it('returns only active todos when filter is "active"', () => {
        const result = applyFilter(todos, 'active');
        expect(result).toEqual([{ id: 1, text: 'A', completed: false }]);
    });

    it('returns only completed todos when filter is "completed"', () => {
        const result = applyFilter(todos, 'completed');
        expect(result).toEqual([{ id: 2, text: 'B', completed: true }]);
    });
});