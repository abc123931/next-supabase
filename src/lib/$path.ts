export const pagesPath = {
  "todo": {
    $url: (url?: { hash?: string }) => ({ pathname: '/todo' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico'
} as const

export type StaticPath = typeof staticPath
