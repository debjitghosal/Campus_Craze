import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import LayoutWithNavbar from "@/components/layout-with-navbar"

export default function Loading() {
  return (
    <LayoutWithNavbar>
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Skeleton className="h-10 w-full sm:w-96" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="w-full">
            <Skeleton className="h-10 w-72 mb-6" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  )
}

function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-10 w-full mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-2.5 w-full" />
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}
