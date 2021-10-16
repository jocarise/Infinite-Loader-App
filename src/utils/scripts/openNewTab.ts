/**
 * Open new tab with the url sent
 *
 * @param {string} url  
 * @return {void} 
 */
const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
export {
    openInNewTab
}