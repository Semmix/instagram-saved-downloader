(() => {
  let MAX_DOWNLOADS_INSTA;
  let INTERVAL_LOADING_TIME_MS;
  let intervalCleaner;
  let stopDownloading;
  let initialized = false;

  const slowDownload = () => {
    if (!initialized) {
      return console.error('Must Init Module!');
    }
    console.log('Starting Slow Download, will download 6 images every ' + INTERVAL_LOADING_TIME_MS / 1000 + ' seconds.');
    stopDownloading = false;
    let index = 0;
    const querySelector = $$;
    const getArray = () => {
      return querySelector('#react-root > section > main > article a > div > div img');
    };

    intervalCleaner = setInterval(() => {
      let arr = getArray();
      if (index % 6 === 0) {
        window.scrollBy(0, 1200);
      }
      for (let i = 0; i < 6; i++) {
        createLinkForDownloadAndRemove(arr[index++].src, 'file-' + index + '.jpg');
      }
    }, INTERVAL_LOADING_TIME_MS);
  };

  function fastRecursiveDownload() {
    if (!initialized) {
      return console.error('Must Init Module!');
    }
    const querySelector = $$;
    let index = 0;
    stopDownloading = false;

    const getArray = () => {
      return querySelector('#react-root > section > main > article a > div > div img');
    };

    let arr = getArray();

    const getImageRecursive = () => {
      if (index >= MAX_DOWNLOADS_INSTA || stopDownloading) {
        return;
      }
      if (index === arr.length - 1) {
        window.scrollBy(0, 1500);
        setTimeout(function() {
          arr = getArray();
          return getImageRecursive();
        }, 2000);
      } else {
        createLinkForDownloadAndRemove(arr[index++].src, 'file-' + index + '.jpg');
        return getImageRecursive();
      }
    };
    getImageRecursive();
  }

  const createLinkForDownloadAndRemove = (url, filename) => {
    var pom = document.createElement('a');
    pom.setAttribute('download', filename);
    pom.setAttribute('href', getRealImageLinkFromThumbnailUrl(url));
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
  };

  const getRealImageLinkFromThumbnailUrl = url => {
    const arr = url.split('/');
    if (arr.length === 9) {
      arr.splice(7, 1);
    }
    arr.splice(4, 1);
    return arr.join('/');
  };

  const downloadStop = () => {
    if (intervalCleaner) {
      intervalCleaner();
    }
    stopDownloading = true;
  };

  const init = (maxDownloadCount = 100, interval = 5000) => {
    MAX_DOWNLOADS_INSTA = maxDownloadCount;
    INTERVAL_LOADING_TIME_MS = interval;
    stopDownloading = false;
    initialized = true;
  };

  window.instaDownloader = {
    init,
    startFastDownload: fastRecursiveDownload,
    startSlowDownload: slowDownload,
    stopDownload: downloadStop
  };
})();
