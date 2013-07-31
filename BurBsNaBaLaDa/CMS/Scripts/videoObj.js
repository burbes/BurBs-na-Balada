var videoObj = function () {
    return {
        
        pathScripts: "",        
        fnAtivaVideoPlayer: function (divId, videoUrl, videoId) {
            $(document).ready(function () {
                flowplayer(
                    divId,
                    videoObj.pathScripts + 'flowplayer/flowplayer-3.2.7.swf',
                    {
                        clip: {
                            autoPlay: true,
                            autoBuffering: true,
                            url: videoUrl
                        },
                        plugins: {
                            controls: {
                                url: videoObj.pathScripts + 'flowplayer/flowplayer.controls-3.2.5.swf',
                                left: 0,
                                bottom: 0,
                                opacity: 0.95,
                                timeColor: '#980118',
                                all: false,
                                play: true,
                                stop: true,
                                scrubber: true,
                                fullscreen: true,
                                volume: true,
                                tooltips: {
                                    buttons: true,
                                    fullscreen: 'Enter fullscreen mode'
                                }
                            }
                        }
                    });
            });
        }
    };
} ();