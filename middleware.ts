import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // All auth is handled in the admin layout
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
