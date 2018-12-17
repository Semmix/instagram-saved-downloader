(() => {
  let MAX_DOWNLOADS_INSTA;
  let INTERVAL_LOADING_TIME_MS;
  let intervalCleaner = null;
  let stopDownloading = false;
  let initialized = false;

  const getArray = () => { 
    return $$('#react-root > section > main > div article a > div img');
  };

  const slowDownload = () => {
    if (!initialized) {
      return console.error('Must Init Module!');
    }
    console.log('Starting Slow Download, will download 6 images every ' + INTERVAL_LOADING_TIME_MS / 1000 + ' seconds.');
    stopDownloading = false;
    let index = 0;

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
    
    let index = 0;
    stopDownloading = false;

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
        forceDownload(arr[index++].src, 'file-' + index + '.jpg');
        return getImageRecursive();
      }
    };
    getImageRecursive();
  }

  const forceDownload = (url, fileName) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
  }


  const downloadStop = () => {
    if (intervalCleaner) {
      intervalCleaner();
    }
    stopDownloading = true;
  };

  const init = (maxDownloadCount = 100, interval = 5000) => {
    if (window.location.href.indexOf('/saved/') === -1) {
      console.log('only works on instagram Saved tab')
      return;
    }
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
