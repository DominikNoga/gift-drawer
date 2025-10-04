import React from 'react';

export type HeaderProps = {
  isActive: boolean;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};
