// abcfunlearn/app/(loginUser)/shop/items.tsx
"use client";

import React from "react";

export const Items = ({ items }: { items: any[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border p-2 rounded">
          <img src={item.imageSrc} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.price} coins</p>
        </div>
      ))}
    </div>
  );
};
