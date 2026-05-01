'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { todayISO } from '@/lib/calculations';

export function useTransactions(uid) {
  const [transactions, setTransactions] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const txRef = collection(db, 'transactions');
    const txQuery = query(
      txRef,
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(txQuery, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTransactions(docs);
      setLoading(false);
    });

    return () => unsub();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;

    const gigsRef = collection(db, 'gigs');
    const gigsQuery = query(gigsRef, where('uid', '==', uid));

    const unsub = onSnapshot(gigsQuery, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGigs(docs);
    });

    return () => unsub();
  }, [uid]);

  async function addTransaction({ type, gigId, amount, note }) {
    await addDoc(collection(db, 'transactions'), {
      uid,
      type,
      gigId,
      amount: Number(amount),
      note: note || '',
      date: todayISO(),
      createdAt: serverTimestamp(),
    });
  }

  async function deleteTransaction(id) {
    await deleteDoc(doc(db, 'transactions', id));
  }

  async function addGig({ name, color }) {
    await addDoc(collection(db, 'gigs'), {
      uid,
      name: name.trim(),
      color,
      initial: name.trim()[0].toUpperCase(),
      createdAt: serverTimestamp(),
    });
  }

  async function deleteGig(id) {
    await deleteDoc(doc(db, 'gigs', id));
  }

  return {
    transactions,
    gigs,
    loading,
    addTransaction,
    deleteTransaction,
    addGig,
    deleteGig,
  };
}