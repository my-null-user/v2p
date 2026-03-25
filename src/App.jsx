import { useState } from "react";
import "./App.css";
import { FileDropZone } from "./components/FileDropZone";
import { StatusMessage } from "./components/StatusMessage";
import { useSqliteConverter } from "./hooks/useSqliteConverter";

const pictureItems = [
  { src: "/picture/1.png", alt: "picture 1" },
  { src: "/picture/2.png", alt: "picture 2" },
  { src: "/picture/3.png", alt: "picture 3" },
  { src: "/picture/4.jpg", alt: "picture 4" },
  { src: "/picture/5.jpg", alt: "picture 5" },
  { src: "/picture/6.jpg", alt: "picture 6" },
  { src: "/picture/7.jpg", alt: "picture 7" },
  { src: "/picture/8.png", alt: "picture 8" },
];

const guideItems = [
  {
    title: "북마크 추출",
    body: "우리의 돌아가신 아버지의 앱에 들어가서 마지막 남은 시체를 파밍해",
    picture: pictureItems[0],
  },
  {
    title: "변환",
    body: "유산을 여기 드롭다운",
    picture: pictureItems[1],
  },
  {
    title: "안된다라고 하면 발작할수도있음",
    body: "그럼 몇개 변환됐는지 나오고 다운로드 받으면된다. \n 앱에서 하면 다운로드 폴백 설정을 안해서 안될수도있다. pc로 해라",
    picture: pictureItems[2],
  },
  {
    title: "복원",
    body: "이제 새 아버지의 설정을간다",
    picture: pictureItems[3],
  },
  {
    title: "복원",
    body: "이거 못찾겠으면 안과 간다",
    picture: pictureItems[4],
  },
  {
    title: "복원",
    body: "누르고 아까 다운받은 favorites-to-import.json을 선택해",
    picture: pictureItems[5],
  },
  {
    title: "누락 확인",
    body: "혹시 누락된 반찬이 걱정되면 백업을해서 pupil-backup.json을 다운받아",
    picture: pictureItems[6],
  },
  {
    title: "누락 확인",
    body: "다시 드롭다운에 넣으면 몇개 복원 못했는지 나오고 밑에 번호도 나와. \n 이정도 해줬으면 나머진 알아서하자",
    picture: pictureItems[7],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("converter");
  const {
    databaseFile,
    favoritesJson,
    compareFile,
    convertedCount,
    detectedMissingFavorites,
    errorMessage,
    infoMessage,
    isConverting,
    canConvert,
    handleDatabaseFileSelect,
    handleCompareFileSelect,
    handleFileClear,
    convertAndDownload,
  } = useSqliteConverter();

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">violet to pupil</p>
        <span>개발자 코멘트</span>
        <div className="hero-tags" aria-label="핵심 기능">
          <span>내가 쓰려고 만들었음</span>
          <span>
            혹시 더 좋은 앱이나 추가하고싶은 기능 있으면 문의받음(나도좀쓰게)
          </span>
          <span>그런데 나도 짤리긴 싫어서 부계팠음</span>
        </div>
        <div className="hero-actions">
          <a
            className="hero-link"
            href="https://discord.gg/DsZ5fqXqu2"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="hero-link-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M20.3 4.37A17.5 17.5 0 0 0 16.02 3l-.2.4a16.1 16.1 0 0 1 3.9 1.4a12.8 12.8 0 0 0-3.33-1.03a14.3 14.3 0 0 0-.87 1.78a16 16 0 0 0-7.05 0a14.3 14.3 0 0 0-.87-1.78A12.8 12.8 0 0 0 4.27 4.8A16.1 16.1 0 0 1 8.17 3.4L7.98 3a17.5 17.5 0 0 0-4.28 1.37C.98 8.4.24 12.3.61 16.15a17.8 17.8 0 0 0 5.25 2.63l1.12-1.82c-.62-.23-1.2-.5-1.75-.83c.15.11.3.22.46.32c2.65 1.6 5.52 1.6 8.16 0c.16-.1.31-.2.46-.32c-.56.33-1.14.61-1.75.84l1.12 1.8a17.8 17.8 0 0 0 5.25-2.62c.43-4.45-.73-8.32-3.4-11.78M9.55 13.73c-1.02 0-1.85-.93-1.85-2.07s.82-2.06 1.85-2.06c1.03 0 1.86.92 1.85 2.06c0 1.14-.82 2.07-1.85 2.07m4.9 0c-1.02 0-1.85-.93-1.85-2.07s.82-2.06 1.85-2.06c1.03 0 1.86.92 1.85 2.06c0 1.14-.82 2.07-1.85 2.07"
              />
            </svg>
            이거 디스코드 링크임
          </a>
          <a
            className="hero-link"
            href="https://github.com/my-null-user/v2p"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="hero-link-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.72c.5.1.68-.22.68-.5c0-.24-.01-1.04-.01-1.88c-2.78.62-3.37-1.21-3.37-1.21c-.45-1.18-1.11-1.49-1.11-1.49c-.91-.64.07-.63.07-.63c1 .07 1.53 1.06 1.53 1.06c.9 1.57 2.35 1.12 2.92.85c.09-.67.35-1.12.63-1.38c-2.22-.26-4.55-1.14-4.55-5.1c0-1.13.39-2.05 1.03-2.77c-.1-.26-.45-1.31.1-2.73c0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35c1.9-1.34 2.74-1.06 2.74-1.06c.55 1.42.2 2.47.1 2.73c.64.72 1.03 1.64 1.03 2.77c0 3.97-2.34 4.83-4.57 5.08c.36.32.68.94.68 1.9c0 1.37-.01 2.47-.01 2.8c0 .27.18.6.69.5A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2"
              />
            </svg>
            깃허브 링크
          </a>
        </div>
      </section>

      <section className="tab-shell">
        <div className="tab-list" role="tablist" aria-label="페이지 탭">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "converter"}
            className={`tab-button ${
              activeTab === "converter" ? "tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("converter")}
          >
            변환기
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "guide"}
            className={`tab-button ${
              activeTab === "guide" ? "tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("guide")}
          >
            사용법
          </button>
        </div>

        {activeTab === "converter" ? (
          <section className="workspace-panel workspace-panel-single">
            <div className="panel-card panel-card-wide">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">1. 파일 업로드</p>
                  <h2>
                    {favoritesJson
                      ? "비교할 pupil-backup.json 업로드"
                      : "violet-bookmarks.db업로드"}
                  </h2>
                </div>
                {databaseFile || compareFile ? (
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={handleFileClear}
                  >
                    파일 초기화
                  </button>
                ) : null}
              </div>

              <FileDropZone
                selectedFile={favoritesJson ? compareFile : databaseFile}
                onFileSelect={
                  favoritesJson
                    ? handleCompareFileSelect
                    : handleDatabaseFileSelect
                }
                accept={
                  favoritesJson
                    ? ".json,application/json"
                    : ".db,.sqlite,application/octet-stream"
                }
                title={
                  favoritesJson
                    ? "비교할 pupil-backuip.json을 넣어 주세요"
                    : "violet-bookmarks.db 파일을 넣어 주세요"
                }
                description={
                  favoritesJson
                    ? "지원 형식: `.json`"
                    : "지원 형식: `.db`, `.sqlite`"
                }
                inputLabel={
                  favoritesJson
                    ? "비교용 JSON 파일 선택"
                    : "violet DB 파일 선택"
                }
                currentLabel={favoritesJson ? "비교용 JSON" : "DB 파일"}
              />

              <div className="action-row">
                <button
                  type="button"
                  className="primary-button"
                  onClick={convertAndDownload}
                  disabled={!canConvert}
                >
                  {isConverting ? "변환 중..." : "pupil favorite 다운로드"}
                </button>
                {favoritesJson ? (
                  <div className="result-chip" aria-live="polite">
                    {compareFile
                      ? `${detectedMissingFavorites.length}개 입력 실패 감지`
                      : `${convertedCount ?? 0}개 변환`}
                  </div>
                ) : null}
              </div>

              <StatusMessage
                errorMessage={errorMessage}
                infoMessage={infoMessage}
              />
              <div className="note-box">
                {detectedMissingFavorites.length > 0 ? (
                  <div className="missing-list">
                    {detectedMissingFavorites.map((favorite) => (
                      <code key={favorite}>{favorite}</code>
                    ))}
                  </div>
                ) : (
                  <p className="note-muted">언제 터질지 몰라</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="guide-panel panel-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">이거 보고도 못하면 진짜 원숭이다.</p>
                <h2>어떻게 하나요? 문의 들어오는 순간 웹사이트 터질수도있음</h2>
              </div>
            </div>

            <div className="guide-placeholder-grid">
              {guideItems.map((item) => (
                <article key={item.title} className="guide-row">
                  <div className="guide-block">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>

                  <figure className="guide-side-picture">
                    <img
                      src={item.picture.src}
                      alt={item.picture.alt}
                      className="guide-side-picture-image"
                    />
                  </figure>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
