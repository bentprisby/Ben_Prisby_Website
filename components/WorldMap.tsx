'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion } from 'framer-motion'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Novi, Michigan coordinates
const noviCoordinates = [-83.4753, 42.4806]

export default function WorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-48 rounded-xl overflow-hidden border border-border bg-card"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: [-100, 40] // Center on North America
        }}
        width={400}
        height={192}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                style={{
                  default: {
                    fill: "hsl(var(--muted))",
                    stroke: "hsl(var(--border))",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "hsl(var(--accent))",
                    stroke: "hsl(var(--border))",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  pressed: {
                    fill: "hsl(var(--accent))",
                    stroke: "hsl(var(--border))",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
        
        {/* Novi, Michigan marker */}
        <Marker coordinates={noviCoordinates}>
          <motion.g
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            {/* Pin shadow */}
            <circle
              cx={0}
              cy={2}
              r={6}
              fill="hsl(var(--muted-foreground))"
              opacity={0.2}
            />
            {/* Pin body */}
            <circle
              cx={0}
              cy={0}
              r={4}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={1}
            />
            {/* Pin center dot */}
            <circle
              cx={0}
              cy={0}
              r={1.5}
              fill="hsl(var(--primary-foreground))"
            />
          </motion.g>
        </Marker>
      </ComposableMap>
      
      {/* Location label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md border border-border"
      >
        <p className="text-xs font-medium text-foreground">Novi, Michigan</p>
      </motion.div>
    </motion.div>
  )
}
