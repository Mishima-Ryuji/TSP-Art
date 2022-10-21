import { fb } from 'api/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

/**
 * useAuthState フックの戻り値の型。
 */
export type AuthState = {
  isSignedIn: boolean
  isLoading: boolean
  userId: string | undefined
}

/**
 * useAuthState が返す初期値。
 * Next.js のサーバーサイドレンダリング時もこの値になる。
 */
const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isLoading: true,
  userId: undefined,
}

/**
 * ユーザーのサインイン状態を取得するためのカスタムフック。
 */
export const useAuthState = (): AuthState => {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE)

  // サインイン状態の変化を監視する
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fb.auth, (user) => {
      if (user) {
        setAuthState({
          isSignedIn: true,
          isLoading: false,
          userId: user.uid,
        })
      } else {
        setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false })
      }
    })

    // ページ遷移時にサインイン状態の監視を解除
    return unsubscribe
  }, [])

  return authState
}
