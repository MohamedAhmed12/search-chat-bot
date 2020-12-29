
var path = require("path");

export const APP_INTERCEPTOR = 'APP_INTERCEPTOR';
export const DEFAULT_DATA_DIR = path.join(process.cwd(), "chromium-data");    
export const WHATSAPP_WEB_URL = "https://web.whatsapp.com";
export const DEFAULT_CHROMIUM_ARGS = [
    `--app=${WHATSAPP_WEB_URL}`,
    "--disable-gpu",
    "--renderer",
    "--no-sandbox",
    "--no-service-autorun",
    "--no-experiments",
    "--no-default-browser-check",
    "--disable-webgl",
    "--disable-threaded-animation",
    "--disable-threaded-scrolling",
    "--disable-in-process-stack-traces",
    "--disable-histogram-customizer",
    "--disable-gl-extensions",
    "--disable-extensions",
    "--disable-composited-antialiasing",
    "--disable-canvas-aa",
    "--disable-3d-apis",
    "--disable-accelerated-2d-canvas",
    "--disable-accelerated-jpeg-decoding",
    "--disable-accelerated-mjpeg-decode",
    "--disable-app-list-dismiss-on-blur",
    "--disable-accelerated-video-decode",
    "--num-raster-threads=1",
];

/**
 * Name of the file that stores bot configuration
 */
export const BOT_SETTINGS_FILE = "bot.json";
 
