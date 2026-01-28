import { useState, useEffect } from 'react';

export function useTaxPersistence<T extends { id: string }>(key: string, initialData: T[]) {
    const [records, setRecords] = useState<T[]>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialData;
        } catch (error) {
            console.error(error);
            return initialData;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(records));
        } catch (error) {
            console.error(error);
        }
    }, [key, records]);

    const addRecord = (record: T) => {
        setRecords((prev) => [record, ...prev]);
    };

    const updateRecord = (id: string, updates: Partial<T>) => {
        setRecords((prev) =>
            prev.map((record) => (record.id === id ? { ...record, ...updates } : record))
        );
    };

    const deleteRecord = (id: string) => {
        setRecords((prev) => prev.filter((record) => record.id !== id));
    };

    const deleteRecords = (ids: string[]) => {
        setRecords((prev) => prev.filter((record) => !ids.includes(record.id)));
    };

    return {
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        deleteRecords,
    };
}
