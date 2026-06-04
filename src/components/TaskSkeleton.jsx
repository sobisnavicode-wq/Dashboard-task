import Skeleton from 'react-loading-skeleton'

export default function TaskSkeleton() {
  return (
    <div className="task-card">
      <Skeleton height={70} borderRadius={10} />
      <Skeleton count={2} />
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <Skeleton width={70} />
        <Skeleton width={70} />
      </div>
      <Skeleton height={30} />
    </div>
  )
}
