import { getUser } from "@/actions";
import { Header, LeftSidebar, RightSidebar } from "@/components/layout";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <Header userPromise={userPromise} />
      </Suspense>

      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block">
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <LeftSidebar />
            </Suspense>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>

          {/* Right Sidebar - Hidden on mobile, visible on xl+ */}
          <div className="hidden xl:block">
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <RightSidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
