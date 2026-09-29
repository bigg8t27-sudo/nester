export default function PropertyDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-20 animate-pulse" aria-busy="true" aria-label="Loading property">
      <div className="section-container py-8">

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Bone className="w-12 h-3" />
          <Bone className="w-2 h-3" />
          <Bone className="w-20 h-3" />
          <Bone className="w-2 h-3" />
          <Bone className="w-32 h-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gallery skeleton */}
            <Bone className="w-full aspect-[16/10] rounded-xl" />
            <div className="flex gap-2">
              {[1,2,3,4].map((i) => <Bone key={i} className="w-20 h-14 rounded-lg" />)}
            </div>

            {/* Header skeleton */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Bone className="w-20 h-5 rounded-full" />
                <Bone className="w-16 h-5 rounded-full" />
              </div>
              <Bone className="w-3/4 h-8 rounded" />
              <Bone className="w-1/2 h-4 rounded" />
              <Bone className="w-32 h-8 rounded" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-4 gap-3">
              {[1,2,3,4].map((i) => <Bone key={i} className="h-24 rounded-xl" />)}
            </div>

            {/* Description skeleton */}
            <div className="flex flex-col gap-2">
              <Bone className="w-24 h-4 rounded" />
              <Bone className="w-full h-3 rounded" />
              <Bone className="w-full h-3 rounded" />
              <Bone className="w-4/5 h-3 rounded" />
              <Bone className="w-2/3 h-3 rounded" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="flex flex-col gap-4">
            <Bone className="w-full h-64 rounded-xl" />
            <Bone className="w-full h-48 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Bone({ className = '' }: { className?: string }) {
  return <div className={`bg-border rounded ${className}`} />
}
