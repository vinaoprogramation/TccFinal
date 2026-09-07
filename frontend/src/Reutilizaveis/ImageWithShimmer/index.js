import React, { useState } from "react";
import { View, Image } from "react-native";
import ShimmerCard from "../ShimmerCard";

export default function ImageWithShimmer({ uri, style }) {
  const [carregando, setCarregando] = useState(true);

  if (!uri) {
    return <ShimmerCard style={style} />;
  }

  return (
    <View style={style}>
      {carregando && (
        <ShimmerCard style={[style, { position: "absolute", top: 0, left: 0 }]} />
      )}
      <Image
        source={{ uri }}
        style={style}
        onLoadEnd={() => setCarregando(false)}
      />
    </View>
  );
}