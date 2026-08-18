const typeColors: Record<string, string> = {
  water: 'bg-blue-400 text-white border-blue-700',
  fire: 'bg-red-400 text-white border-red-700',
  grass: 'bg-green-400 text-white border-green-700',
  electric: 'bg-yellow-300 text-gray-900 border-yellow-600',
  poison: 'bg-purple-400 text-white border-purple-700',
  normal: 'bg-gray-400 text-white border-gray-700',
  ice: 'bg-cyan-300 text-gray-900 border-cyan-600',
  fighting: 'bg-orange-600 text-white border-orange-800',
  ground: 'bg-amber-500 text-white border-amber-700',
  flying: 'bg-indigo-300 text-white border-indigo-600',
  psychic: 'bg-pink-400 text-white border-pink-700',
  bug: 'bg-lime-500 text-white border-lime-700',
  rock: 'bg-yellow-700 text-white border-yellow-900',
  ghost: 'bg-purple-700 text-white border-purple-900',
  dragon: 'bg-violet-600 text-white border-violet-800',
  fairy: 'bg-pink-300 text-gray-900 border-pink-500',
}

const fallback = 'bg-gray-400 text-white border-gray-700'

interface TypeBadgeProps {
  type: string
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const colors = typeColors[type.toLowerCase()] ?? fallback
  return (
    <span className={`text-xs font-mono font-bold uppercase px-2 py-1 border-2 rounded ${colors}`}>
      {type}
    </span>
  )
}
