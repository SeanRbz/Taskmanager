import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from '@/navigation';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/*
        TODO: If your state solution requires a Provider (e.g. Context, Zustand),
        wrap RootNavigator with it here.
      */}
      <RootNavigator />
    </>
  );
}
