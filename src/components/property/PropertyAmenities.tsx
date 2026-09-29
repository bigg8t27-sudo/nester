import {
  Car, Waves, ShieldCheck, Sofa, Wind, Zap,
  Flower2, Dumbbell, Wifi, ChefHat, Tv2,
  Sun, Fence, Droplets, Package,
} from 'lucide-react'
import type { ReactNode } from 'react'

// Map known amenity labels → Lucide icons
const AMENITY_ICONS: Record<string, ReactNode> = {
  'Parking':          <Car      size={16} />,
  'Swimming Pool':    <Waves    size={16} />,
  'Security':         <ShieldCheck size={16} />,
  'Furnished':        <Sofa     size={16} />,
  'Air Conditioning': <Wind     size={16} />,
  'Generator':        <Zap      size={16} />,
  'Garden':           <Flower2  size={16} />,
  'Gym':              <Dumbbell size={16} />,
  'WiFi':             <Wifi     size={16} />,
  'Kitchen':          <ChefHat  size={16} />,
  'TV':               <Tv2      size={16} />,
  'Balcony':          <Sun      size={16} />,
  'Fence':            <Fence    size={16} />,
  'Water':            <Droplets size={16} />,
}

function getIcon(amenity: string): ReactNode {
  return AMENITY_ICONS[amenity] ?? <Package size={16} />
}

interface PropertyAmenitiesProps {
  amenities: string[]
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  if (amenities.length === 0) {
    return (
      <p className="text-sm text-text-secondary italic">
        No amenities listed for this property.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="flex items-center gap-2.5 p-3 bg-white rounded-lg border border-border/60
                     hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
        >
          <span className="text-accent flex-shrink-0" aria-hidden="true">
            {getIcon(amenity)}
          </span>
          <span className="text-sm font-medium text-text-primary">{amenity}</span>
        </div>
      ))}
    </div>
  )
}
