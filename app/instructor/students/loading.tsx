import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import LayoutWithNavbar from "@/components/layout-with-navbar"

export default function Loading() {
  return (
    <LayoutWithNavbar >
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Skeleton className="h-10 w-full sm:w-96" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="w-full">
            <Skeleton className="h-10 w-72 mb-6" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <StudentCardSkeleton key={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  )
}

function StudentCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
          <Skeleton className="h-5 w-16 ml-auto" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-36 col-span-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}
