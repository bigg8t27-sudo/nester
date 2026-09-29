interface ResultCountProps {
  count: number
  total: number
}

export default function ResultCount({ count, total }: ResultCountProps) {
  if (count === total) {
    return (
      <p className="text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">{total}</span>
        {' '}propert{total === 1 ? 'y' : 'ies'} found
      </p>
    )
  }

  return (
    <p className="text-sm text-text-secondary">
      <span className="font-semibold text-text-primary">{count}</span>
      {' '}of{' '}
      <span className="font-semibold text-text-primary">{total}</span>
      {' '}properties
    </p>
  )
}
