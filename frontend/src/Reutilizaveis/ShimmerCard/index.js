import React from "react";
import { Image } from "react-native";
import shimmer from '../../../assets/shimmer.gif';

export default function ShimmerCard({ style }) {
  return (
    <Image
      source={shimmer}
      style={style}
    />
  );
}