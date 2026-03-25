import initSqlJs from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'

let sqlJsPromise = null

function loadSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({
      locateFile: () => sqlWasmUrl,
    })
  }

  return sqlJsPromise
}

function ensureBookmarkTableExists(database) {
  const statement = database.prepare(
    'SELECT name FROM sqlite_master WHERE type = ? AND name = ?',
  )

  try {
    statement.bind(['table', 'BookmarkArticle'])
    return statement.step()
  } finally {
    statement.free()
  }
}

function normalizeFavoriteValues(values) {
  return values
    .map((row) => row[1])
    .filter((value) => value !== null && value !== undefined)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value))
}

export async function extractFavoritesFromDatabase(file) {
  if (!file) {
    throw new Error('SQLite 파일을 먼저 선택해 주세요.')
  }

  try {
    const SQL = await loadSqlJs()
    const arrayBuffer = await file.arrayBuffer()
    const database = new SQL.Database(new Uint8Array(arrayBuffer))

    try {
      const hasBookmarkTable = ensureBookmarkTableExists(database)
      if (!hasBookmarkTable) {
        throw new Error('BookmarkArticle 테이블을 찾을 수 없습니다.')
      }

      const queryResult = database.exec('SELECT * FROM "BookmarkArticle"')
      const rows = queryResult[0]?.values ?? []

      // 두 번째 컬럼만 필요하므로 row[1]만 읽고, 숫자로 바꿀 수 없는 값은 제외합니다.
      return normalizeFavoriteValues(rows)
    } finally {
      database.close()
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new Error('SQLite 파일 파싱에 실패했습니다.')
  }
}
