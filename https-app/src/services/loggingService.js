import * as Sentry from '@sentry/react';

function init(){
    Sentry.init({dsn: "https://cba725963b314feda883d9fe4f1db41c@o433559.ingest.sentry.io/5388926"});

}
function log(){
    Sentry.captureException(error); 

}

export default {
    init,
    log
}