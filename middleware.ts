import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Just pass through all requests
  // Auth protection is handled client-side in the dashboard/admin pages
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
