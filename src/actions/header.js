import * as Types from '../constants/actions'

export function setFileName (filename) {
  return { type: Types.SET_FILE_NAME, filename: filename }
}

export function setFullScreen (isFullScreen) {
  return { type: Types.SET_FULL_SCREEN, fullscreen: isFullScreen }
}
